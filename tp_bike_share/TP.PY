import pandas as pd
import datetime
 
chicago_data = pd.read_csv("C:/Users/AAJDADA/Downloads/cleaned_chicago_city.csv", parse_dates=['Start Time'])
 
ny_data = pd.read_csv('C:/Users/AAJDADA/Downloads/cleaned_new_york_city.csv', parse_dates=['Start Time'])
 
washington_data = pd.read_csv('C:/Users/AAJDADA/Downloads/cleaned_washington_city.csv', parse_dates=['Start Time'])
 
chicago_data['day_of_week'] = chicago_data['Start Time'].dt.weekday  
ny_data['day_of_week'] = ny_data['Start Time'].dt.weekday
washington_data['day_of_week'] = washington_data['Start Time'].dt.weekday
 
# Stocker dans un dictionnaire
villes = {
  'New York': ny_data,
  'Chicago': chicago_data,
  'Washington': washington_data
}
 
         
print("Bienvenue dans l'application Bikeshare!")
 
while True:
 
  ville = input("Veuillez saisir le nom d'une ville (New York, Chicago, Washington): ")
  if ville not in villes:
    print("Ville invalide, veuillez réessayer")
    continue
   
  mois = input("Saisissez le mois sous la forme XX (ex: 01 pour Janvier): ")
  df = villes[ville][villes[ville]['Start Time'].dt.month == int(mois)]
  df['day_of_week'] = df['Start Time'].dt.dayofweek
 
 
 
 
 
  print(f"Jour de la semaine le plus actif: {df['day_of_week'].mode()[0]}")
  print(f"Heure de démarrage la plus courante: {df['Start Time'].mode()[0]}")
  print(f"Durée moyenne de voyage: {df['Trip Duration'].mean()} minutes")
  print(f"Nombre total d'utilisateurs par catégorie: {df['User Type'].value_counts()}")
  print(f"Nombre total d'hommes: {df[df['Gender']=='Male'].shape[0]}")
  print(f"Nombre total de femmes: {df[df['Gender']=='Female'].shape[0]}")
  print(f"Année de naissance la plus ancienne: {df['Birth Year'].min()}")
  print(f"Année de naissance la plus récente: {df['Birth Year'].max()}")
  print(f"Année de naissance la plus courante: {df['Birth Year'].mode()[0]} ({df['Birth Year'].value_counts().max()})")
 
  if not df.empty and 'day_of_week' in df.columns:
   
        print(f"Jour de la semaine le plus actif: {df['day_of_week'].mode().iloc[0]}")
     
  else:
        print("Aucune donnée disponible pour le mois spécifié.")
 
  afficher = input("Afficher les 10 première lignes ? (o/n)")
  if afficher == 'o':
    print(df.head(10))
 
  continuer = input("Voulez-vous traiter d'autres données ? (o/n)")
  if continuer == 'n':
    break
 
print("Merci d'avoir utilisé l'application Bikeshare!")
# Dispose d’un menu contextuel
# Composer
