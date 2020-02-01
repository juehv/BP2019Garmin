<?php
//input fields
$first_name_input = "First name";
$last_name_input = "Last name";
$email_input = "Email";
$password_input = "Password";
$repeat_password_input = "Repeat password";
$term_of_use = "Terms of use and data protection";
$term_of_use_accept = "accepted";

//navigation settings
$nav_bar_title = "DiaConvert";
$nav_bar_reg = "Registration";
$nav_bar_dd = "Data download";
$nav_bar_pw = "Password reset";
$nav_bar_rec = "Reconnect";

//registration settings
$reg_title = "Registration for DiaConvert";
$reg_headline = "Registration for DiaConvert";
$reg_button = "Authorize plugin";
$reg_privacy_text = "Data protection";
$reg_privacy_path = "template/privacy_protection.pdf";
$reg_privacy_close = "Close";

//reconnect settings
$rec_title = "Reconnect";
$rec_headline = "Reconnect";
$rec_button = "Connect account with Garmin";

//callback settings
$call_title = "Registration in progress";
$call_headline = "Registration in progress";

//password-reset settings
$pw_title = "Password reset";
$pw_headline = "Password reset";
$pw_request_button = "Reset password";
$pw_reset_button = "Change password";

//data download settings
$dd_title = "Data download";
$dd_headline = "Data download";
$dd_button = "Download data";

//password reset mail subject
$pw_subject = "Password reset";

//messages sent to the user
$input_error = "An error occurred. Please fill in all fields";
$pw_error = "An error occurred. The passwords must be the same";
$registered = "The email is already registered! The <a href=\"../password-reset.php\"> password </a> can be changed or the  <a href=\"../reconnect.php\"> connection </a> to Garmin can be restored.";
$mail_send_error = "Unfortunately there was an error ... Please try again later. If this happens frequently, please contact ....";
$mail_send = "Email has been sent!";
$password_reset_expired = "The password reset request has expired! Please request a new email.";
$api_error = "An error occurred. Please try again later!";
$pw_info_text = "If you forgot your password, you can reset it here. <br>
We will then send you an email with a link that you can use to set a new password. ";
$pw_reset_info_text = "Please enter a new password and confirm it.";
$reg_info_text = "DiaConvert is an application that collects fitness data from Garmin-Connect accounts, converts it to the 
<a href=\"https://github.com/OpenDiabetes/OpenDiabetesVault/wiki/Data-Model\"> OpenDiabetesVault </a> format and then makes 
it available to the respective user for download <br> If you register with DiaConvert, you authorize us to access, save and process 
 all of your Garmin-Connect fitness data. After registering once, your data is automatically collected until you 
<a href=\"https://connect.garmin.com/modern/settings/accountInformation\"> disconnect your Garmin-Connect </a>account from DiaConvert.";
$rec_info_text = "If you have disconnected from DiaConvert in your Garmin Connect account, you can use the
Login data of your DiaConvert account to restore the connection. Data collected before the separation remains available and will be downloadable together with the new data.";
$call_info_text = "Your registration will be completed in about 5 minutes. <br> Then you can request your data via the menu item \"Data Download\"";
$dd_info_text = "Here you can download the collected fitness data of your DiaConvert account in the <a href=\"https://github.com/OpenDiabetes/OpenDiabetesVault/wiki/Data-Model\"> OpenDiabetesVault </a> format. " ;
$pw_reset_success = "Password was changed successfully!";
$login_error = "An error occurred. Wrong email and / or password.";
$dd_login_success = "Data is being downloaded";
$dd_data_error = "No fitness data has been collected for you yet";
$pw_mail_text = "Click the following link to set a new password:";