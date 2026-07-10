<?php
 session_start(); ?>

<?php if (isset($_SESSION['message'])): ?>
    <div class="message">
        <?= $_SESSION['message']; ?>
    </div>
    <?php unset($_SESSION['message']); ?>
<?php endif; ?>

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Learn & Earn</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.6/css/unicons.css">
</head>
<body>

<!-- Header -->
<header class="header">
    <a href="#" class="logo"><i class="fas fa-hiking"></i> facetohire.com</a>
    <nav class="navbar">
        <div id="nav-close" class="fas fa-times"></div>
        <a href="#home">home</a>
        <a href="#category">roles</a>
        <a href="#about us">about us</a>
        <a href="#reviews">reviews</a>
        <a href=logout.php>Logout</a>
    </nav>
    <div class="icons">
        <div id="menu-btn" class="fas fa-bars"></div> 
        <div id="search-btn" class="fas fa-search"></div>
    </div>
</header>

<!-- Search Form -->
<div class="search-form">
    <div id="close-search" class="fas fa-times"></div>
    <form>
        <input type="search" placeholder="Search here..." id="search-box">
        <label for="search-box" class="fas fa-search"></label>
    </form>
</div>

<!-- Home Section -->
<section class="home" id="home">
    <div class="wrapper">
        <div class="box" style="background: url(images/header1.jpg) no-repeat; background-size: cover;">
            <div class="content">
                <span>never stop</span>
                <h3>exploring & learning</h3>
                <p>FacetoHire Helps You to Achieve Your Dream Job</p>
                <a href="#category" class="btn">get started</a>
            </div>
        </div>  
    </div>
</section>

<!-- Category Section -->
<section class="category" id="category">
    <h1 class="heading" onclick="window.location.href='home.php'" style="cursor: pointer;">Roles
    </h1>
    <div class="box-container">
        <div class="box">
            <img src="images/category-1.png" alt="dataanalystImg">
            <h3>Data Analyst</h3>
            <p>A Data Analyst studies data to uncover trends and insights that help businesses make smarter decisions. They turn complex information into clear reports and actionable strategies.</p>
            <a href="https://graduate.northeastern.edu/knowledge-hub/what-does-a-data-analyst-do/" class="btn">read more</a>
        </div>
        <div class="box">
            <img src="images/category-2.png" alt="softwaredeveloperImg">
            <h3>Software Developer</h3>
            <p>A Software Developer designs, builds, and maintains applications or systems to solve problems and improve efficiency. They turn ideas into functional software that meets user needs.</p>
            <a href="https://in.indeed.com/career-advice/finding-a-job/what-is-a-software-developer" class="btn">read more</a>
        </div>
        <div class="box">
            <img src="images/category-3.png" alt="cloudengineerImg">
            <h3>Cloud Engineer</h3>
            <p>A Cloud Engineer designs, implements, and manages cloud-based systems and services. They ensure applications and data run securely, efficiently, and are easily scalable for business needs.</p>
            <a href="https://www.indeed.com/career-advice/finding-a-job/cloud-engineer" class="btn">read more</a>
        </div>
    </div>
</section>

<section id="about us">
        <h1>About Us</h1>
        <div class="about-content">
            <div class="about-box">
                <h2>Welcome to Face2Hire</h2>
                <p>
                    We believe interview preparation should be smart, interactive, and
                    personalized. That’s why we’ve built a platform combining AI with
                    proven training techniques to help you perform at your best.
                </p>
            </div>
            <div class="about-box">
                <h2>Our Mission</h2>
                <p>
                    To empower job seekers with the tools, confidence, and skills they
                    need to succeed in any interview, whether it’s your first job or
                    your dream role.
                </p>
            </div>
            <div class="about-box">
                <h2>What We Offer</h2>
                <ul>
                    <li>AI-Driven Interview Simulations</li>
                    <li>Instant, Actionable Feedback</li>
                    <li>Personalized Learning Paths</li>
                    
                </ul>
            </div>
            <div class="about-box">
                <h2>Why Choose Us</h2>
                <p>
                    We combine cutting-edge technology with a human-centered approach.
                    Our AI coach understands your answers, provides feedback, and helps
                    you practice until you’re ready to impress any recruiter.
                </p>
            </div>
            <div class="about-box">
                <h2>Our Vision</h2>
                <p>
                    To make high-quality interview preparation accessible to everyone,
                    regardless of location, background, or career stage.
                </p>
            </div>
        </div>
    </section>
    <!-- Reviews Section -->
    <section class="reviews" id="reviews">
        <h1>What Our Users Say</h1>
        <div class="review-container">

            <div class="review-card">
                <img src="https://i.pravatar.cc/80?img=2" alt="Ananya Mehta">
                <div class="stars">⭐⭐⭐⭐</div>
                <p>"The personalized learning path kept me motivated and focused. Face2Hire completely changed the way I prepare for interviews.
                    . Highly recommended for any job seeker!"</p>
                <h3>Ananya Mehta</h3>
                <span>Marketing Executive</span>
            </div>

            <div class="review-card">
                <img src="https://i.pravatar.cc/80?img=5" alt="Vivek Nair">
                <div class="stars">⭐⭐⭐⭐⭐</div>
                <p>"The analytics and feedback were game-changers for me. I knew exactly which skills I needed to
                    improve and how to do it. Thanks to Face2Hire, I cracked three interviews back-to-back!"</p>
                <h3>Vivek Nair</h3>
                <span>Mechanical Engineer</span>
            </div>

            <div class="review-card">
                 <img src="https://i.pravatar.cc/80?img=1" alt="Rohit Sharma">
                <div class="stars">⭐⭐⭐⭐</div>
                <p>"Easy to use, insightful, and motivating! The platform helped me structure my answers and handle
                    tricky questions better."</p>
                <h3>Sneha Kapoor</h3>
                <span>Business Analyst</span>
            </div>
            <div class="review-card">
                <img src="https://i.pravatar.cc/80?img=3" alt="Karthik">
                <div class="stars">⭐⭐⭐⭐⭐</div>
                <p>"Clear feedback, great platform, and very easy to use. I recommend FacetoHire to all freshers."</p>
                <h3>Karthik</h3>
                <span>UI/UX Designer</span>
            </div>
        </div>
    </section>


<!-- Footer Section -->
<section class="footer">
    <div class="box-container">
        <div class="box">
            <h3>Quick links</h3>
            <a href="#home">home</a>    
            <a href="#roles">roles</a>
            <a href="#faq">faq</a>
            <a href="#about">about us</a>
        </div>
        <div class="box">
            <h3>extra links</h3>
            <a href="#contact">ask questions</a>
            <a href="#">terms of use</a>
            <a href="#">privacy policy</a>
        </div>
        <div class="box">
            <h3>contact info</h3>
            <a href="tel:+919087654321"> <i class="fas fa-phone"></i> +91 8115585868 </a>
            <a href="mailto: facetohire@gmail.com"> <i class="fas fa-envelope"></i> facetohire@gmail.com </a>
            <a href="#"> <i class="fas fa-map"></i> TamilNadu, India - 226010 </a>
        </div>
        <div class="box">
            <h3>follow us</h3>
            <a href="https://www.facebook.com/Face2Hire"> <i class="fab fa-facebook-f"></i> facebook </a>
            <a href="https://www.instagram.com/Face2Hire_"> <i class="fab fa-instagram"></i> instagram </a>
            <a href="https://www.linkedin.com/in/facetohire/"> <i class="fab fa-linkedin"></i> linkedin </a>
            <a href="https://github.com/facetoHire"> <i class="fab fa-github"></i> github </a>
        </div>
    </div>
    <div class="credit">created by <span>facetohire</span> | all rights reserved!</div>
</section>

<script src="js/script.js"></script>
</body>
</html>