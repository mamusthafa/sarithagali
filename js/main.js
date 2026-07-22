const phoneNumber = "918861176955";

document.querySelectorAll(".nav").forEach((nav) => {
  const links = nav.querySelector(".navlinks");
  if (!links) return;

  let toggle = nav.querySelector(".nav-toggle");
  if (!toggle) {
    toggle = document.createElement("button");
    toggle.className = "nav-toggle";
    toggle.type = "button";
    toggle.innerHTML = '<span class="sr-only">Menu</span>';
    nav.insertBefore(toggle, links);
  }

  toggle.setAttribute("aria-label", "Open navigation menu");
  toggle.setAttribute("aria-expanded", "false");
  links.id = links.id || "primary-navigation";
  toggle.setAttribute("aria-controls", links.id);

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  links.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    nav.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    nav.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  });
});

function buildMessage(form) {
  const data = new FormData(form);
  const name = data.get("name") || "Guest";
  const guests = data.get("guests") || "not sure";
  const checkin = data.get("checkin") || "flexible";
  const nights = data.get("nights") || "not sure";
  const room = data.get("room") || "best available option";
  const note = data.get("message") || "Please share availability and package details.";
  return `Hi Galimale Homestay, I am ${name}. I am looking for a Chikmagalur homestay stay for ${guests} guest(s). Check-in: ${checkin}. Nights: ${nights}. Room/package preference: ${room}. ${note}`;
}

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-whatsapp-form]");
  if (!form) return;
  event.preventDefault();
  const message = encodeURIComponent(buildMessage(form));
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank", "noopener");
});

document.querySelectorAll("[data-default-whatsapp]").forEach((link) => {
  const text = encodeURIComponent("Hi Galimale Homestay, I found your website and want to check room availability, packages, food options and location details.");
  link.href = `https://wa.me/${phoneNumber}?text=${text}`;
});
