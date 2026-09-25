const filedata = import.meta.glob('../../assets/img/*', { eager: true, import: 'default' });

const assets = Object.fromEntries(
    Object.entries(filedata).map(([path, url]) => [
        path.split('/').pop(),
        url
    ])
);

export default assets; 