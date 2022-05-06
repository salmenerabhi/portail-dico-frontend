package Sub::Exporter::Progressive;

# ABSTRACT: Only use Sub::Exporter if you need it

use strict;
use warnings;

our $VERSION = '0.001003'; # VERSION

use List::Util 'first';

sub import {
   my ($self, @args) = @_;

   my $inner_target = caller(0);
   my ($TOO_COMPLICATED, $export_data) = sub_export_options(@args);

   die <<'DEATH' if $TOO_COMPLICATED;
You are using Sub::Exporter::Progressive, but the features your program uses from
Sub::Exporter cannot be implemented without Sub::Exporter, so you might as well
just use vanilla Sub::Exporter
DEATH

   my $full_exporter;
   no strict;
   @{"${inner_target}::EXPORT_OK"} = @{$export_data->{exports}};
   @{"${inner_target}::EXPORT"} = @{$export_data->{defaults}};
   *{"${inner_target}::import"} = sub {
      use strict;
      my ($self, @args) = @_;

      if (first { ref || !m/^\w+$/ } @args) {
         die 'your usage of Sub::Exporter::Progressive requires Sub::Exporter to be installed'
            unless eval { require Sub::Exporter };
         $full_exporter ||=
            Sub::Exporter::build_exporter($export_data->{original});

         goto $full_exporter;
      } else {
         require Exporter;
         goto \&Exporter::import;
      }
   };
}

sub sub_export_options {
   my ($setup, $options) = @_;

   my $TOO_COMPLICATED = 0;

   my @exports;
   my @defaults;

   if ($setup eq '-setup') {
      my %options = %$options;

      OPTIONS:
      for my $opt (keys %options) {
         if ($opt eq 'exports') {

            $TOO_COMPLICATED = 1, last OPTIONS
               if ref $options{exports} ne 'ARRAY';

            @exports = @{$options{exports}};

            $TOO_COMPLICATED = 1, last OPTIONS
               if first { ref } @exports;

         } elsif ($opt eq 'groups') {

            $TOO_COMPLICATED = 1, last OPTIONS
               if first { $_ ne 'default' } keys %{$options{groups}};

            @defaults = @{$options{groups}{default} || [] };
         } else {
            $TOO_COMPLICATED = 1;
            last OPTIONS
         }
      }
      @defaults = @exports if @defaults && $defaults[0] eq '-all';
   }

   return $TOO_COMPLICATED, {
      exports => \@exports,
      defaults => \@defaults,
      original => $options,
   }
}

1;


__END__
=pod

=head1 NAME

Sub::Exporter::Progressive - Only use Sub::Exporter if you need it

=head1 VERSION

version 0.001003

=head1 SYNOPSIS

 package Syntax::Keyword::Gather;

 use Sub::Exporter::Progressive -setup => {
   exports => [qw( break gather gathered take )],
   groups => {
     defaults => [qw( break gather gathered take )],
   },
 };

 # elsewhere

 # uses Exporter for speed
 use Syntax::Keyword::Gather;

 # somewhere else

 # uses Sub::Exporter for features
 use Syntax::Keyword::Gather 'gather', take => { -as => 'grab' };

=head1 DESCRIPTION

L<Sub::Exporter> is an incredibly powerful module, but with that power comes
great responsibility, er- as well as some runtime penalties.  This module
is a C<Sub::Exporter> wrapper that will let your users just use L<Exporter>
if all they are doing is picking exports, but use C<Sub::Exporter> if your
users try to use C<Sub::Exporter>'s more advanced features features, like
renaming exports, if they try to use them.

Note that this module will export C<@EXPORT> and C<@EXPORT_OK> package
variables for C<Exporter> to work.  Additionally, if your package uses advanced
C<Sub::Exporter> features like currying, this module will only ever use
C<Sub::Exporter>, so you might as well use it directly.

=head1 AUTHOR

Arthur Axel "fREW" Schmidt <frioux+cpan@gmail.com>

=head1 COPYRIGHT AND LICENSE

This software is copyright (c) 2012 by Arthur Axel "fREW" Schmidt.

This is free software; you can redistribute it and/or modify it under
the same terms as the Perl 5 programming language system itself.

=cut

