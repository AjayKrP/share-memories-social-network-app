function like(id) {
    $.post('/memories/like/' + id, (data, status) => {
        if (data.hasOwnProperty('success') && data.success === true) {
            let likeSelector = $('#like-count-' + id);
            let currentCount = !isNaN(likeSelector.text()) ? parseInt(likeSelector.text()) : 1;
            likeSelector.text(currentCount + 1);
        }
    })
}
