<?php
session_start();

// Retrieve session message if any, then clear it
$message = "";
if (isset($_SESSION['message'])) {
    $message = $_SESSION['message'];
    unset($_SESSION['message']); // Clear message after displaying
}

// Array of job roles with associated icons
$roles = [
    "Data Analyst" => "fa-chart-bar",
    "Software Developer" => "fa-code",
    "Web Developer" => "fa-laptop-code",
    "Data Scientist" => "fa-chart-line",
    "Cloud Engineer" => "fa-cloud",
    "UI/UX Designer" => "fa-pencil-ruler",
    "Cybersecurity Analyst" => "fa-user-shield",
    "Network Engineer" => "fa-project-diagram",
    "Database Administrator" => "fa-server",
    "Mobile App Developer" => "fa-mobile-alt",
    "DevOps Engineer" => "fa-cogs",
    "AI Engineer" => "fa-robot",
    "Business Analyst" => "fa-briefcase",
    "Product Manager" => "fa-tasks",
    "Game Developer" => "fa-gamepad",
    "QA Engineer" => "fa-bug",
    "Blockchain Developer" => "fa-link",
    "System Administrator" => "fa-network-wired",
    "IT Support Specialist" => "fa-headset",
    "Machine Learning Engineer" => "fa-robot",
    "Full Stack Developer" => "fa-layer-group",
    "Systems Analyst" => "fa-chart-pie",
    "ERP Consultant" => "fa-user-tie",
    "Digital Marketing Specialist" => "fa-bullhorn",
    "HR Specialist" => "fa-users",
    "Financial Analyst" => "fa-dollar-sign",
    "Content Writer" => "fa-pen-nib",
    "Research Scientist" => "fa-flask",
    "Robotics Engineer" => "fa-robot",
    "Biomedical Engineer" => "fa-heartbeat",
    "SEO Specialist" => "fa-search",
    "AI Researcher" => "fa-brain"
];

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FaceToHire - Career Roles</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
    body { font-family: Arial, sans-serif; background: #f0f4f8; margin:0; padding:0; }
    header { background: #0a3866; color: #fff; padding: 20px; text-align: center; }
    h1 { margin: 0; }
    .container { width: 90%; max-width: 1100px; margin: 40px auto; }
    .message { text-align: center; font-weight: bold; margin: 15px auto; padding: 10px; border-radius: 5px; width: 90%; max-width: 500px; }
    .message.success { background: #d4edda; color: #155724; }
    .message.error { background: #f8d7da; color: #721c24; }
    .message.warning { background: #fff3cd; color: #856404; }
    input[type="text"] { width: 100%; padding: 12px; margin-bottom: 25px; font-size: 16px; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
    .card { background: #fff; padding: 30px 20px; text-align: center; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; text-decoration: none; color: #333; display: block; }
    .card:hover { transform: translateY(-5px); box-shadow: 0 6px 14px rgba(0,0,0,0.2); background: #eaf5ff; }
    .card i { font-size: 40px; color: #0077cc; margin-bottom: 15px; }
    .card h3 { margin: 0; font-size: 18px; color: #2c3e50; }
</style>
<script>
function filterRoles() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        let text = card.innerText.toLowerCase();
        card.style.display = text.includes(input) ? "block" : "none";
    });
}
</script>
</head>
<body>
<header>
    <h1>FaceToHire - Your Dream Career Roles</h1>
    <p>Select your dream career path</p>
</header>

<?php if (!empty($message)): ?>
    <div class="message 
        <?php 
            if (str_contains($message, '✅') || str_contains($message, '🎉')) echo 'success';
            elseif (str_contains($message, '❌')) echo 'error';
            else echo 'warning';
        ?>">
        <?php echo htmlspecialchars($message); ?>
    </div>
<?php endif; ?>

<div class="container">
    <input type="text" id="searchBox" onkeyup="filterRoles()" placeholder="Search for a role...">

    <div class="grid">
        <?php foreach ($roles as $role => $icon): ?>
            <a class="card" href="role.php?name=<?php echo urlencode($role); ?>">
                <i class="fas <?php echo $icon; ?>"></i>
                <h3><?php echo htmlspecialchars($role); ?></h3>
            </a>
        <?php endforeach; ?>
    </div>
</div>
</body>
</html>
