<?php
$hostname='localhost';
$username='root';
$password='';
$databasename='cresty'

$mysquli = $mysquli_connect($hostname,$username,$password,$databasename);

if(isset($_POST['submit']))
{
   $fullname= $_POST['fullname'];
   $gmail= $_POST['gmail'];
   $contactnumber= $_POST['contactnumber'];
   $message= $_POST['message'];

}
$result=$mysquli_query($mysquli,"insert into students value('','$fullname','$gmail','$contactnumber','$message')");
   if($result){
    echo "WELCOME TO OUR  COMMUNITY [$fullname]";
   }
   else{
    echo "something went wrong try again [$fullname]";
   }



?>