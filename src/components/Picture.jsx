import PropType from 'prop-types';

export const Picture = (props) => {
    return (
        <>
            <img src={props.urls.small} alt={props.description} />
        </>
    )
}

Picture.propTypes = {
    urls: PropType.object.isRequired,
    description: PropType.string.isRequired
}
