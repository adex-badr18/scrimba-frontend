document.addEventListener('click', (e) => {
    if (e.target.classList.contains('post')) {
        location.href = './post-view.html'
    }
})