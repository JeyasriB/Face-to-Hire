document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const switchFormLinks = document.querySelectorAll('.switch-form');

  // Switch between Login & Signup
  switchFormLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (link.textContent.includes('Sign Up')) {
        container.classList.remove('active-login');
        container.classList.add('active-signup');
      } else {
        container.classList.remove('active-signup');
        container.classList.add('active-login');
      }
    });
  });

  // Handle form submissions with fetch
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      // ✅ get messageBox safely
      const messageBox = document.getElementById('message-box');
      if (!messageBox) {
        console.error("❌ ERROR: No element with id='message-box' found in HTML!");
        return;
      }

      try {
        let response = await fetch("auth.php", {
          method: "POST",
          body: formData
        });

        let result = await response.text();
        console.log("✅ Server returned:", result);

        // Show acknowledgement
        messageBox.innerText = result;
        messageBox.style.display = "block";

        // Green for success, Red for errors
        if (result.includes("Welcome") || result.includes("Signup successful")) {
          messageBox.style.background = "#c1f0c1";
          messageBox.style.color = "green";
        } else {
          messageBox.style.background = "#f8d7da";
          messageBox.style.color = "red";
        }

        // Auto-hide after 5 seconds
        setTimeout(() => {
          messageBox.style.display = "none";
        }, 5000);

      } catch (err) {
        console.error("❌ Fetch error:", err);
      }
    });
  });
});
