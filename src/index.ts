window.addEventListener('load', Main)

function Main() {
  document.querySelectorAll('.accordion-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const accordion = button.nextElementSibling as HTMLElement
      accordion.classList.toggle('show')
      button.classList.toggle('extend')
    })
  })
}
