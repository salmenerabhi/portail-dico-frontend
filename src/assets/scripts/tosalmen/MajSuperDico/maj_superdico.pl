#!/usr/bin/perl -w

use strict;
use Win32::OLE qw(in with);
use warnings;
use DBI;
use XML::Twig;

my $dirMapping;#chemin du dictionnaire
my $SuperDicoFile;#chemin du super dico 
my $RequestFile;#chemin du fichier des demandes de phrase
my $lang;#Traduction language
my %hashDicos=(); #hashmap pour stocker les phrases en fran�ais existantes  avec leurs codes et  les noms des langues pour lequelles on a de traduction  
my %phrases_a_ajouter=(); #hasmap pour stocker les phrases qu'on va les ajouter dans le super dico 
my %maj_mapping=(); #hasmap pour stocker les codes et les mapping  
my %hash_ref=();#hasmap pour stocker les r�f�rences existants dans le mapping
my $code;
my $lastNumber=0;
my %hashlang=(
      "AR" => "ar_AR",
	  "BG" => "bg_BG",
	  "BR" => "br_BR",
	  "CS" => "cs_CZ",
	  "DA" => "da_DK", 
	  "DE" => "de_DE", 
	  "EL" => "el_GR", 
	  "EN" => "en_GB", 
	  "ES" => "es_ES",
	  "FA" => "fa_FA", 
	  "FI" => "fi_FI", 
      "FR" => "fr_FR",
	  "HE" => "he_HE",   
      "HR" => "hr_HR",                 
      "HU" => "hu_HU", 
      "ID" => "id_ID", 
      "IT" => "it_IT", 
      "JA" => "ja_JP", 
	  "LT" => "lt_LT", 
      "NL" => "nl_NL",
      "NV" => "nv_NV", 	  
      "PL" => "pl_PL", 
      "PT" => "pt_PT", 
	  "RO" => "ro_RO",
      "RU" => "ru_RU",  
	  "SL" => "sl_SL",   
	  "SR" => "sr_SR",      	  
      "SV" => "sv_SE", 
      "TH" => "th_TH",     
      "TR" => "tr_TR", 
	  "ZH" => "zh_CN" 

);
my $XMLOUT;
sub main
{
	system("cls");
	print "\n********************************Begin*******************************\n";
	checkArguments();
	my $LOG_file = "log.log";
	my $LOG1_file = "log1.log";
	open (LOG,">>:utf8",$LOG_file) or die ("problem � l'overture");
	open (LOG1,">>:utf8",$LOG1_file) or die ("problem � l'overture");
	get_sentences_superdico();
	get_sentences_request();
	Write_Dicos();
	Write_Mapping();
	close LOG;
	close LOG1;
	print "\n********************************done********************************\n";
}

sub checkArguments
{
	if (! (scalar(@ARGV) == 4))
	{
		print "Usage: perl  create_dicos.pl arg1 \n";
		print "arg1 : path of Mapping directory\n";
		print "arg2 : path of super dico file\n";
		print "arg3 : path of request sentences file\n";
		print "arg4 : Traduction language\n";
		
		print "----------------------------------\n";
		die   "ERROR : Wrong number of parameters\n";
	}
	
	if (!-d $ARGV[0])
	{
		die("ERROR : repertoire $ARGV[0] n'existe pas \n");
	}
	$dirMapping=$ARGV[0];
	$SuperDicoFile=$ARGV[1];
	$RequestFile=$ARGV[2];	
	$lang=$ARGV[3];	 
}



sub get_sentences_superdico
{

    my $dicoName;
	my $thesaurus;
	$code=0;
    my $doc;
	my %phrases_a_ajouter2=();
	my %phrases_a_modifier=();#hasmap pour stocker les phrases qui existent d�ja et qu'on va leurs ajouter des traductions
	my %hashMapping=(); #hashmap pour le mapping ayant pour pour cl� le code dans la base access et pour valeur valuer est le code du super dico
    #my @phrases=$thesaurus->getElementsByTagName('phrase');
	#$code=$phrases[scalar(@phrases)-1]->getAttribute('code');		
	# si le super dico existe on recupere les phrases en fran�ais avec leurs codes et  les noms des langues pour lequelles on a de traduction
	if(-e $SuperDicoFile)
	{
			print "\nChargement du fichier $SuperDicoFile \n";	
	        open $XMLOUT, '>:utf8',"fileTemporaire.xml";	
            my $twig= new XML::Twig(pretty_print  => 'indented',twig_handlers =>{phrase => \&phrase},);        			                      
			$twig->parsefile($SuperDicoFile);                     
			$twig->purge; 
			$twig->dispose;
			close $XMLOUT;
            rename "fileTemporaire.xml",$SuperDicoFile;	
          	sub phrase
			{ 
               
				my($t,$phrase)= @_;                                    
				my $libelleLg=($phrase->get_xpath('./libelle[@lang ="'.$lang.'"]'))[0];
				my $codePhrase=$phrase->att('code');
				
				if($code<$codePhrase)
				{
					$code=$codePhrase;
				}
				if(defined $libelleLg)
			    {
					
				    
				    if($libelleLg->text ne "")
				    {
					    my %langues=();
						my %hash=();
						
             			my @libelles=$phrase->children('libelle');
						
						foreach my $libelle(@libelles)
			            {
				            if($libelle->att('lang') eq $lang && defined $libelle->text)
				            {
								if($libelle->text  ne "")
								{ 
									my $min = lc($libelle->text);
									$hashDicos{$min}=1;
								}
							}
			            }
				    }
					else
					{
					    $libelleLg->delete;
					
					
					}
			    }	
				$t->flush($XMLOUT) or die "Failed to write XML file:$!\n";
		        $t->purge;	
              
			}						
			
				
	}

  	
}

sub get_sentences_request
{
	my %hashSentences=();
	my $twig = new XML::Twig();   	
		    
	if($twig->safe_parsefile($RequestFile))
	{
		print "Chargement du fichier <$RequestFile>: OK\n";
				     
		my @requests = $twig->get_xpath('//RequestList/Request');	
		my $i=0;		
		foreach my $request (@requests)
		{ 
			if(defined($request->att('RequestText')))
			{
				my $sentence= $request->att('RequestText');
				   $sentence =~ s/\s+$//g; #suppression des espaces � la fin de la phrase
				   $sentence =~ s/\s+/ /g;#suppression des doubles espaces dans la phrase
				   my $sentence_min = get_min($sentence);
				   my $sent = lc($sentence);
				if(!defined($hashSentences{$sent}))
				{
				
					my @contexts = $request->get_xpath('./RequestContexts/RequestContext');
					foreach my $context (@contexts)
					{
						my $target = ($context->get_xpath('./TargetThesaurusList/TargetThesaurus'))[0];	
                        if(defined $target)
						{	
							my $find= 0;
							my $phrase= "" ;
							my $TargetThesaurusName=$target->att('TargetThesaurusName');
							$hashSentences{$sentence_min}=$TargetThesaurusName;
							if(!exists($hashDicos{$sent}))							
							{
								$phrases_a_ajouter{$sentence_min}= $TargetThesaurusName;
							}
						}
					}
					
					
				}				 
			}
		}
	}
	else
	{
	    print "Chargement du fichier <$RequestFile>: KO\n";
	}
				
				$twig->purge();
                $twig->dispose();	
}

sub get_min(){
	
my $phrase = shift;
my $change =0;
my @spl = split(' ', $phrase); 
  
	# displaying result using foreach loop 
	my $j=0;
	foreach my $i (@spl)  
	{ 
                              							  
	 my $ligne = $i;
	 		
		 $ligne =~ s/�/e/g;
		 $ligne =~ s/�/e/g;
		 $ligne =~ s/�/a/g;
		 $ligne =~ s/�/u/g;
		 $ligne =~ s/�/o/g;
		 $ligne =~ s/�/c/g;
		 $ligne =~ s/�/a/g;
		 $ligne =~ s/�/e/g;
		 $ligne =~ s/�/i/g;
		 $ligne =~ s/�/u/g;
		 $ligne =~ s/�/u/g;
		 $ligne =~ s/�/a/g;
		 $ligne =~ s/�/i/g;
		 $ligne =~ s/�/e/g;
		 $ligne =~ s/�/o/g;
		 $ligne =~ s/\"\s*//g;
		 $ligne =~ s/\*\(//g;
		 $ligne =~ s/\(//g;
		 $ligne =~ s/d\'//g;
	     $ligne =~ s/\'//g;
	                  
		$ligne =~ s/\�//g;
		

	    #d�tecter les chaine qui commence par majuscule suivie d'une minuscule
	    if(( $ligne =~ m/^[A-Z]+[a-z]+(.*)/ ) and( $j>0) ){ 
		#$ligne = lc($ligne);
		#d�tecter les chaines qui ne contiennent pas un caract�tre en majuscule
		#if($ligne!~/(.*)[A-Z]{1,}/){
			
	    $spl[$j] = lc($i);
		
	    print $spl[$j]."\n";
		#print "oui\n";
		
		$spl[$j] =~ s/^(["])([A-Z]+)([a-z]+)(.*)/$1\L$2$3$4/g;
		$spl[$j] =~ s/^([a-z]+)([a-z]+)(.*)(\/)+([A-Z]+)([a-z]+)(.*)/$1$2$3$4\L$5$6$7/g;
		$spl[$j] =~ s/^([a-z]+)([a-z]+)(.*)(\/)+([A-Z]+)([a-z]+)(.*)/$1$2$3$4\L$5$6$7/g;
		$spl[$j] =~ s/^([a-z])(\')([A-Z]+)([a-z]+)(.*)/$1$2\L$3$4$5/g;
		$spl[$j] =~ s/^([\(\/\'])+([A-Z]+)([a-z]+)(.*)/$1\L$2$3$4/g;
		$spl[$j] =~ s/energie/�nergie/g;
		$spl[$j] =~ s/multi-Diag/Multi-Diag/ig;
		$spl[$j] =~ s/europe/Europe/g;
		$spl[$j] =~ s/ethanol/�thanol/g;
		$spl[$j] =~ s/(\s)+evap(\s)*/$1EVAP$2/g;
		$spl[$j] =~ s/alcoguard/Alcoguard/g;
		$spl[$j] =~ s/opacidiag/OPACIDIAG/g;
		$spl[$j] =~ s/etat/�tat/g;
		$spl[$j] =~ s/ecran/�cran/g;
		$spl[$j] =~ s/electrique/�lectrique/g;
		$spl[$j] =~ s/marche\/D�marrage/marche\/d�marrage/g; 
		$spl[$j] =~ s/on\/Start/on\/start/g; 
		$spl[$j] =~ s/off\/On\/Start/off\/on\/start/g;
		$spl[$j] =~ s/on\/Off/on\/off/g; 
		$spl[$j] =~ s/ad[b|B]lue/AdBlue/g; 
		$spl[$j] =~ s/marche\/Arr�t/marche\/arr�t/g;
		$spl[$j] =~ s/D'admission/d'admission/g; 
        $spl[$j] =~ s/l'Acc�l�rateur\/P�dale/l'acc�l�rateur\/p�dale/g;
		$spl[$j] =~ s/commande\/Ouvrir/commande\/ouvrir/g; 
		$spl[$j] =~ s/tr\/mn/tr\/min/g;
		$spl[$j] =~ s/economie/�conomie/g;
		$spl[$j] =~ s/ fap/ FAP/g;
		$spl[$j] =~ s/etude/�tude/g;
		$spl[$j] =~ s/electro-Pompe/�lectro-Pompe/g;
		$spl[$j] =~ s/electronique/�lectronique/g;
		$spl[$j] =~ s/ hz/ Hz/g;
		$spl[$j] =~ s/ europe/ Europe/g;
		$spl[$j] =~ s/ br�sil/ Br�sil/g;
		$spl[$j] =~ s/ERREUR/erreur/g;
		$spl[$j] =~ s/cor�e/Cor�e/g;
		$spl[$j] =~ s/ inde/ Inde/g;
		$spl[$j] =~ s/ gmbH/ GmbH/g;
		$spl[$j] =~ s/Stop and start/stop and start/g;
		$spl[$j] =~ s/stop&Start/stop&start/g;
		$spl[$j] =~ s/Stop&Start/stop&start/g;
		$spl[$j] =~ s/(\s)+elev�e/$1�lev�e/g;
		$spl[$j] =~ s/ecran/�cran/g;
		$spl[$j] =~ s/eclairage/�clairage/g;
		$spl[$j] =~ s/equateur\,/�quateur\,/g;
		$spl[$j] =~ s/eteint/�teint/g;
		$spl[$j] =~ s/evolution/�volution/g;
		$spl[$j] =~ s/echec\,/�chec\,/g;
		$spl[$j] =~ s/ecriture/�criture/g;
		$spl[$j] =~ s/etoile/�toile/g;
		$spl[$j] =~ s/(\s)+etape/$1�tape/g;
		$spl[$j] =~ s/ emetteur/ �metteur/g;
		$spl[$j] =~ s/nox/NOx/ig;                         
		$spl[$j] =~ s/emetteurs/�metteurs/g;
		$spl[$j] =~ s/(\s)+et�/$1�t�/g;
		$spl[$j] =~ s/economique/�conomique/g;
		$spl[$j] =~ s/etalonn�/�talonn�/g;
		$spl[$j] =~ s/el�ment/�l�ment/g;
		$spl[$j] =~ s/injection\/Allumage/injection\/allumage/g;
		$spl[$j] =~ s/alcool\/Essence/alcool\/essence/g;
		$spl[$j] =~ s/avant\/Arri�re/avant\/arri�re/g;
		$spl[$j] =~ s/(\s)+etage/$1�tage/g;
		$spl[$j] =~ s/(\s)+etats/$1�tats/g;
		$spl[$j] =~ s/etalonnage/�talonnage/g;
		$spl[$j] =~ s/echappe/�chappe/g;
		$spl[$j] =~ s/equipements/�quipements/g;
		$spl[$j] =~ s/electropompe/�lectropompe/g;
		$spl[$j] =~ s/arr�t&D�marrage/arr�t&d�marrage/g;
		$spl[$j] =~ s/electrovanne/�lectrovanne/g;
		$spl[$j] =~ s/electrovannes/�lectrovannes/g;
		$spl[$j] =~ s/evaporateur/�vaporateur/g;
		$spl[$j] =~ s/equilibre/�quilibre/g;
		$spl[$j] =~ s/economie\/Sport/�conomie\/sport/g;
		$spl[$j] =~ s/ouvrir\/D�marrer/ouvrir\/d�marrer/g;
		$spl[$j] =~ s/air\/Carburant/air\/carburant/g;
		$spl[$j] =~ s/electrique(DAE)\/Airbag/�lectrique(DAE)\/airbag/g;
		$change = 1;
		}
		$j++;
		
	
	}
	my $chaine = join ' ', @spl;
	if($change==1){
		print LOG  $chaine."\n";
		print LOG1 $phrase."\n";
	}	
	return $chaine ;
}	
sub Write_Dicos
{
		if(-e $SuperDicoFile)
		{				   
		 
				print "Mise � jours du ficher $SuperDicoFile.\n";
				
				open(FILEIN, "<:encoding(utf8)", $SuperDicoFile) or die $!;
                my $SuperDicoFileTmp = $SuperDicoFile.'.tmp';
                open (SUPER_DICO_FILE, ">:encoding(utf8)", $SuperDicoFileTmp);
                while (my $ligne = <FILEIN>)				
				{
				    if($ligne =~ /<\/thesaurus/)
				    {
					
						my @keys=keys%phrases_a_ajouter;
                        if(@keys){
						my $i=1;
						
						foreach my $text (@keys)
						{	    
							
							my $dico = $phrases_a_ajouter{$text};
							$text=~s/&/&amp;/g;
							$text=~s/>/&gt;/g;
							$text=~s/</&lt;/g;
							$text=~s/"/&quot;/g;
							$code = $code + $i;
							
							$maj_mapping{$dico}{$code}=1 ;
						
							
							
							my $line= "\t<phrase code=\"$code\">\n";
							print SUPER_DICO_FILE $line;

							foreach my $lan(sort(keys%hashlang))
							{
								my $langue=$hashlang{$lan};
								if($langue eq  $lang)
								{
								
								$line="\t\t<libelle lang=\"$lang\">$text</libelle>\n";
								print SUPER_DICO_FILE $line;
								}
								# else 
								# {
								# $line="\t\t<libelle lang=\"$langue\"/>\n";	
								 # print SUPER_DICO_FILE $line;
								# }
								
							}
							$line = "\t</phrase>\n";
							print SUPER_DICO_FILE $line;
							
							
						}
						}
						else{
						
						print "aucune phrases a ajouetr\n";
						}
					}
					print SUPER_DICO_FILE $ligne; 
				}
				close(SUPER_DICO_FILE);
				close(FILEIN);
				rename $SuperDicoFileTmp,$SuperDicoFile;	
		}   
		
}

sub Write_Mapping
{
	print "Mise � jours des fichier de mapping.\n";
	my @keys=keys%maj_mapping;
	my $twig = new XML::Twig();
	foreach my $dico (keys%maj_mapping)
	{ 
	    my $file_map= $dirMapping . "/map_" . $dico .".xml";
		if(-e $file_map)
		{

			
			my $twig= new XML::Twig(pretty_print  => 'indented',twig_handlers =>{Sentence => \&sentence});                        
			$twig->parsefile($file_map);                     
			$twig->purge; 
			$twig->dispose;
			
		#	rename "fileTemporaire.xml",$SuperDicoFile;	
			sub sentence
			{                
				my($t,$sentence)= @_; 
                my $number=$sentence->att('Number');
                my	$reference=$sentence->att('Reference');
                $hash_ref{$reference}=1;				
				if($number>$lastNumber)
				{
				   $lastNumber=$number;
				   
				}
				$t->purge;				
			}
			
			
	        open(FILEIN, "<:encoding(utf8)", $file_map) or die $!;
			my $file_map_tmp = $file_map.'.tmp';
			open (MAPPING_FILE, ">:encoding(utf8)", $file_map_tmp);
			while (my $ligne = <FILEIN>)	
			{
			    if($ligne =~ /<\/Mapping/)
				{
					 foreach my $code(sort par_num (keys%{$maj_mapping{$dico}}))
					{
					
						if(!exists $hash_ref{$code})
						{	
							$lastNumber = $lastNumber+1;
							my $line="\t<Sentence Number=\"$lastNumber\"  Reference=\"$code\" />\n";
							print MAPPING_FILE $line;
							
						 }
						 
					}
				}	
				print MAPPING_FILE $ligne;
           
			}
			close(MAPPING_FILE);
			close(FILEIN);
            rename $file_map_tmp,$file_map;	
		}
	}
	
}

main();
sub par_num { return $a <=> $b }
