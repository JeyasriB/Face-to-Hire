<?php
session_start();
include "db.php";
include "sendmail.php"; // Include your PHPMailer setup

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    // Check if email already exists
    $check = $conn->prepare("SELECT id FROM users WHERE email=?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();
    
    if ($check->num_rows > 0) {
        $check->close();
        header("Location: register.html?error=email_exists"); // redirect with error
        exit();
    }
    $check->close();

    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $password);

    if ($stmt->execute()) {
        // Send welcome email using correct function
        sendWelcomeEmail($email, $name);

        // Redirect to login page after registration
        header("Location: login.html?success=1");
        exit();
    } else {
        header("Location: register.html?error=registration_failed");
        exit();
    }

    $stmt->close();
}
?>
