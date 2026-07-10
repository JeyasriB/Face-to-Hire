<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ✅ Fix paths (all in same folder as sendmail.php)
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';
require __DIR__ . '/PHPMailer/Exception.php';

function sendWelcomeEmail($userEmail, $userName) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'FaceToHire@gmail.com';      // 👉 replace with your Gmail
        $mail->Password   = 'ufff skvw ufwp gqep';        // 👉 Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('FaceToHire@gmail.com', 'FaceToHire');
        $mail->addAddress($userEmail, $userName);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Welcome to FaceToHire 🎉';
        $mail->Body = "
                        <h2>Hi $userName, 👋</h2>
                        <p>Welcome to <b>FaceToHire</b> 🚀</p>
                        <p>We’re so happy to have you join our community of learners and job seekers. 
                        At FaceToHire, we believe that <b>every step you take today brings you closer to your dream career tomorrow</b>.</p>
                        <p>Here you’ll find:</p>
                        <ul>
                            <li>💡 Practical guides to prepare for different job roles</li>
                            <li>🛠 Skill-building tips to strengthen your knowledge</li>
                            <li>🎯 Interview strategies to boost your confidence</li>
                            <li>🌟 A community that encourages you every step of the way</li>
                        </ul>
                        <p>Remember: <i>“Success doesn’t come to you, you go to it.”</i> 
                        Stay consistent, keep learning, and you’ll achieve great things!</p>
                        <br>
                        <p style='color:gray;'>Warm regards,<br><b>Team FaceToHire</b></p>
                    ";

        $mail->send();
        return true;

    } catch (Exception $e) {
        echo "❌ Mailer Error: {$mail->ErrorInfo}";
        return false;
    }
}