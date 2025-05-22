// Attendre que le DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", () => {
  // Initialisation de la bibliothèque d'animation AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  })

  // Gestion de la navbar au scroll
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Gestion du bouton retour en haut
  const backToTopButton = document.getElementById("backToTop")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("active")
    } else {
      backToTopButton.classList.remove("active")
    }
  })

  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Initialisation du carousel Bootstrap
  var bootstrap = window.bootstrap // Declare bootstrap variable
  var carousel = new bootstrap.Carousel(document.getElementById("mainCarousel"), {
    interval: 5000, // Intervalle entre les slides en millisecondes
    wrap: true, // Boucle infinie
    keyboard: true, // Navigation avec le clavier
  })

  // Animation des compteurs
  const counters = document.querySelectorAll(".counter")
  const speed = 200

  const animateCounter = () => {
    counters.forEach((counter) => {
      const target = Number.parseInt(counter.innerText.replace(/[^\d]/g, ""))
      const count = 0
      const increment = target / speed

      if (counter.hasAttribute("data-animated")) return

      counter.setAttribute("data-animated", "true")

      const updateCount = () => {
        const currentCount = Number.parseInt(counter.innerText.replace(/[^\d]/g, "")) || 0
        const newCount = Math.ceil(currentCount + increment)

        if (newCount < target) {
          counter.innerText = newCount + (counter.innerText.includes("+") ? "+" : "")
          setTimeout(updateCount, 1)
        } else {
          counter.innerText = target + (counter.innerText.includes("+") ? "+" : "")
        }
      }

      updateCount()
    })
  }

  // Observer pour déclencher l'animation des compteurs lorsqu'ils sont visibles
  const statsSection = document.querySelector(".stats-section")
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(statsSection)
  }

  // Gestion du formulaire de contact
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault()

      // Validation simple du formulaire
      let isValid = true
      const requiredInputs = contactForm.querySelectorAll("[required]")

      requiredInputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.classList.add("is-invalid")
        } else {
          input.classList.remove("is-invalid")
        }
      })

      // Si le formulaire est valide, on pourrait envoyer les données
      if (isValid) {
        // Animation de succès
        const submitBtn = contactForm.querySelector('button[type="submit"]')
        const originalText = submitBtn.innerHTML

        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i> Message envoyé!'
        submitBtn.classList.add("btn-success")
        submitBtn.disabled = true

        // Réinitialiser le formulaire après un délai
        setTimeout(() => {
          contactForm.reset()
          submitBtn.innerHTML = originalText
          submitBtn.classList.remove("btn-success")
          submitBtn.disabled = false
        }, 3000)
      }
    })

    // Retirer la classe is-invalid lorsque l'utilisateur commence à taper
    contactForm.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", function () {
        if (this.value.trim()) {
          this.classList.remove("is-invalid")
        }
      })
    })
  }

  // Navigation fluide pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Fermer le menu mobile si ouvert
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse)
          bsCollapse.hide()
        }
      }
    })
  })
})
