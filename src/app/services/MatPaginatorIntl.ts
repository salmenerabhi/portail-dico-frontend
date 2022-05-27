import { MatPaginatorIntl } from "@angular/material/paginator";

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 de ${length}`; }
  
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
}


export function getfrPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'objets par page:';
  paginatorIntl.nextPageLabel = 'page suivante';
  paginatorIntl.previousPageLabel = 'page précedente';
  paginatorIntl.getRangeLabel = dutchRangeLabel;
  
  return paginatorIntl;
}

export function getenPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();
  
    paginatorIntl.itemsPerPageLabel = 'items par page:';
    paginatorIntl.nextPageLabel = 'page next';
    paginatorIntl.previousPageLabel = 'page next';
    paginatorIntl.getRangeLabel = dutchRangeLabel;
    
    return paginatorIntl;
  }