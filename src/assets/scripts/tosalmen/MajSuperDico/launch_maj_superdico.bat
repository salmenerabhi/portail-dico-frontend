@echo off
@echo 		__***__ Mise à jour dico __***__
rem TortoiseProc.exe /commanF:update /path:"F:\mdiagdico\trunk\Donnees\Dicos\dicmd.xml" /closeonenF:1 fr_FR en_GB
perl\bin\perl.exe "maj_superdico.pl" "mapping" "dicmd.xml" "Demandephrase_SAIDANI_HASSEN_DVD3-2022.xml" "en_GB"

rem ..\perl\bin\perl "maj_superdico.pl" "F:\mdiagdico\trunk\Donnees\Mapping" "F:\mdiagdico\trunk\Donnees\Dicos\dicmd.xml"  "F:\mdiagdico\trunk\Donnees\_Request_sentences\Not_Implemented\FR\newUserThesauRequest.xml" "fr_FR"








pause
