<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = ""; // your MySQL password
$dbname = "entrydata";
$port = "3307"; // if using a custom port

$conn = new mysqli($servername, $username, $password, $dbname, $port);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get role name from URL
if (isset($_GET['name'])) {
    $roleName = $conn->real_escape_string($_GET['name']); // sanitize input

    $sql = "SELECT * FROM roles1 WHERE role_name = '$roleName'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $role = $result->fetch_assoc();
    } else {
        echo "<p>Role not found.</p>";
        exit;
    }
} else {
    echo "<p>No role selected.</p>";
    exit;
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo htmlspecialchars($role['role_name']); ?> - Details</title>
<style>
/* Background with image */
body {
    margin: 0;
    font-family: Arial, sans-serif;

    /* ✅ Background image */
    background-image: url("images/pic4.avif");
    background-size: cover;        /* make it cover full screen */
    background-position: center;   /* center the image */
    background-repeat: no-repeat;  /* no repeat */
    min-height: 100vh;             /* full viewport height */
    color: #0e0d0dff;                   /* ✅ visible white text */
    position: relative;
}

/* Optional overlay for better text visibility */
body::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(226, 216, 216, 0.01);  /* semi-transparent dark overlay */
    z-index: 0;
}

/* Header */
header {
    background: rgba(0, 119, 204, 0.8);
    color: #0a0909ff;
    padding: 20px;
    text-align: center;
    position: relative;
    z-index: 1;
}

/* Container with falling animation */
.container {
    max-width: 900px;
    margin: 40px auto;
    padding: 20px;
    position: relative;
    z-index: 1;

    /* Animation */
    opacity: 0;
    transform: translateY(-100px);
    animation: fallDown 1.2s ease-out forwards;
}

/* Falling animation keyframes */
@keyframes fallDown {
    0% {
        opacity: 0;
        transform: translateY(-100px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Back Button */
.back-btn {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 24px;
    background: #0077cc;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    border-radius: 8px;
    transition: 0.3s;
    position: relative;
    z-index: 1;
}

.back-btn:hover {
    background: #005999;
}
</style>

</head>
<body>
<div class="container">
    <h1><?php echo htmlspecialchars($role['role_name']); ?></h1>
    <p><strong>Skills:</strong> <?php echo htmlspecialchars($role['skills']); ?></p>
    <p><strong>Programming Languages:</strong> <?php echo htmlspecialchars($role['programming_languages']); ?></p>
    <p><strong>Interview Rounds:</strong> <?php echo htmlspecialchars($role['interview_rounds']); ?></p>

    <p><strong>Basic Questions:</strong></p>
    <ul>
        <?php
        $questions = explode('|', $role['basic_questions']);
        foreach ($questions as $q) {
            echo "<li>" . htmlspecialchars(trim($q)) . "</li>";
        }
        ?>
    </ul>

    <p><strong>Platform Aptitude:</strong><br>
        <?php
        $aptLinks = explode(',', $role['platform_prepare_aptitude']);
        foreach ($aptLinks as $link) {
            list($name, $url) = explode('|', $link);
            echo '<a href="' . htmlspecialchars(trim($url)) . '" target="_blank">' . htmlspecialchars(trim($name)) . '</a><br>';
        }
        ?>
    </p>

    <p><strong>Platform Interview:</strong><br>
        <?php
        $intLinks = explode(',', $role['platform_prepare_interview']);
        foreach ($intLinks as $link) {
            list($name, $url) = explode('|', $link);
            echo '<a href="' . htmlspecialchars(trim($url)) . '" target="_blank">' . htmlspecialchars(trim($name)) . '</a><br>';
        }
        ?>
    </p>

    <p><strong>Platform Communication:</strong><br>
        <?php
        $comLinks = explode(',', $role['platform_prepare_communication']);
        foreach ($comLinks as $link) {
            list($name, $url) = explode('|', $link);
            echo '<a href="' . htmlspecialchars(trim($url)) . '" target="_blank">' . htmlspecialchars(trim($name)) . '</a><br>';
        }
        ?>
    </p>

    <p><strong>Salary Package:</strong> <?php echo htmlspecialchars($role['salary_package']); ?></p>
    

    <a class="back-btn" href="home.php">← Back to Roles</a>
     <a class="back-btn" href="chatbot/index.html">Next →</a>
</div>
</body>
</html>
