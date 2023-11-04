import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FormUser({ name, setName, job, setJob }) {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                    className="form-control"
                    type="email"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="form-label">Job</Form.Label>
                <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="Job"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                />
            </Form.Group>
        </Form>
    );
}

export default FormUser;
