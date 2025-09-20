import { Alert } from 'react-bootstrap';

export default function CustomAlert({ header, body, variant, onClose }) {
    return (
        <Alert variant={variant} onClose={() => onClose()} dismissible>
            <Alert.Heading>{header}</Alert.Heading>
            <p>
                {body}
            </p>
        </Alert>
    )
}