const userAlbums = {
    '用户1': [
        { id: 1, cover: "https://img.zcool.cn/community/01b3795d996936a801211d535390a2.jpg?imageMogr2/auto-orient/thumbnail/1280x%3e/sharpen/0.5/quality/100", title: "我最喜欢的音乐", artist: "Wangcy", link: "https://wchenyi.github.io/HeoMusic" },
        { id: 2, cover: "https://via.placeholder.com/160", title: "Album 2", artist: "Artist 2", link: "#" },
    ],
    '用户2': [
        { id: 3, cover: "https://via.placeholder.com/160", title: "Album 3", artist: "Artist 3", link: "#" },
        { id: 4, cover: "https://via.placeholder.com/160", title: "Album 4", artist: "Artist 4", link: "#" },
    ],
    '用户3': [
        { id: 5, cover: "https://via.placeholder.com/160", title: "Album 5", artist: "Artist 5", link: "#" },
        { id: 6, cover: "https://via.placeholder.com/160", title: "Album 6", artist: "Artist 6", link: "#" },
    ],
};

let currentUser = '用户1';

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    updateThemeToggleButton();
}

function updateThemeToggleButton() {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
}

function changeUser(user) {
    currentUser = user;
    document.getElementById('userTitle').textContent = `${user}的专辑`;
    updateAlbums();
    updateActiveUserButton();
}

function updateAlbums(albums = userAlbums[currentUser]) {
    const albumGrid = document.getElementById('albumGrid');
    albumGrid.innerHTML = '';
    albums.forEach(album => {
        const albumElement = document.createElement('div');
        albumElement.className = 'album';
        albumElement.innerHTML = `
            <img src="${album.cover}" alt="${album.title}">
            <h3>${album.title}</h3>
            <p>${album.artist}</p>
        `;
        albumElement.addEventListener('click', () => {
            navigateToAlbum(album);
        });
        albumGrid.appendChild(albumElement);
    });
}

function navigateToAlbum(album) {
    if (album.link && album.link !== "#") {
        window.location.href = album.link;
    } else {
        console.log(`暂无链接为专辑: ${album.title}`);
    }
}

function updateActiveUserButton() {
    document.querySelectorAll('.user-button').forEach(button => {
        button.classList.toggle('active', button.dataset.user === currentUser);
    });
}

function toggleSearchBar() {
    const searchBar = document.getElementById('searchBar');
    searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
}

function searchAlbums() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredAlbums = userAlbums[currentUser].filter(album => 
        album.title.toLowerCase().includes(searchTerm) || 
        album.artist.toLowerCase().includes(searchTerm)
    );
    updateAlbums(filteredAlbums);
}

function toggleAnnouncementModal() {
    const modal = document.getElementById('announcementModal');
    modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    updateAlbums();
    updateThemeToggleButton();

    document.getElementById('openSidebar').addEventListener('click', toggleSidebar);
    document.getElementById('closeSidebar').addEventListener('click', toggleSidebar);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    document.querySelectorAll('.user-button').forEach(button => {
        button.addEventListener('click', () => {
            changeUser(button.dataset.user);
            toggleSidebar();
        });
    });

    document.getElementById('searchButton').addEventListener('click', toggleSearchBar);
    document.getElementById('searchInput').addEventListener('input', searchAlbums);

    document.getElementById('announcementButton').addEventListener('click', toggleAnnouncementModal);
    document.querySelector('.modal .close').addEventListener('click', toggleAnnouncementModal);

    // 点击模态框外部关闭模态框
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('announcementModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
