// relateive path to the data
data_location = "/site-data.json";

// on preprod and prod this should be 
// data_location = "dynamic/data.php";
// so it loads from the raw data in the data/ folder

// for an archived system with no php, the results of 
// data.php should be saved into a file called data.json 
// and this file should have
// data_location = "data.json";

app_status='dev'
// app_status='prod'
// app_status='pprd'
