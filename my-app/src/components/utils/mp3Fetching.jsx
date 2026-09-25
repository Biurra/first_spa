const filedata = import.meta.glob('../../assets/audio/*', { eager: true, import: 'default' });

const samples = Object.fromEntries(
    Object.entries(filedata).map(([path, url]) => [
        path.split('/').pop(),
        url
    ])
);

export default samples; 