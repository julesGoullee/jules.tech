window.addEventListener('load', Main)

function Main() {
  document.querySelectorAll('.accordion-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const parent = button.parentElement as HTMLElement
      if (
        !parent.classList.contains('show') &&
        !parent.classList.contains('hide')
      ) {
        parent.classList.add('show')
      } else {
        parent.classList.toggle('show')
        parent.classList.toggle('hide')
      }
    })
  })
}
