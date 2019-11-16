import React, { PureComponent } from 'react';
import { Card, Button, Container, Row, Col, InputGroup, FormControl, Form } from 'react-bootstrap';

class FormComponent extends PureComponent {
    state = { emailList: [], email: "", message: " " };
    handleUpload = async (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onloadstart = async (event) => {
            document.getElementById("status").innerText = "Loading file data...";
        };
        reader.onload = async (event) => {
            // The file's text will be printed here
            await this.setState({ emailList: JSON.parse(event.target.result) })
            document.getElementById("status").innerText = "";
        };

        reader.readAsText(file);
    }

    handleChange = async (e) => {
        await this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const { emailList } = this.state;
        return (
            <div>
                <div>
                    <Container>
                        <Row>
                            <Col xs lg="10" className="m_c">
                                <Card>
                                    <Card.Header as="h5">Add Email</Card.Header>
                                    <Card.Body>
                                        <InputGroup>
                                            <FormControl
                                                placeholder="Recipient's username"
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                name="email"
                                                defaultValue={this.state.email}
                                                onChange={this.handleChange}
                                            />
                                            <div className="Browse_group">
                                                <div className="choose_file">
                                                    <button type="button" className="btn btn-default">Browse</button>
                                                    <input name="file" type="file" onChange={this.handleUpload} accept="application/JSON" />
                                                </div>
                                                <Button variant="outline-secondary">ADD</Button>
                                            </div>
                                        </InputGroup>
                                        <sub><b>Note:</b> Use above "Browse" option to import emails from Json Files</sub>
                                        {/* Display Section */}
                                        <hr />
                                        <div id="status" className="text-center"></div>
                                        <div className="displayGrid pt-2 pb-2 text-center">
                                            {emailList && emailList.map((item, index) => <span key={index}>{item.email}</span>)}
                                            {emailList && emailList.length === 0 ? "Please add an email to show here" : ""}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="10" className="m_c">
                                <Card>
                                    <Card.Header as="h5">Message</Card.Header>
                                    <Card.Body>
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            {/* <Form.Label>Example textarea</Form.Label> */}
                                            <Form.Control as="textarea" name="message" rows="5" defaultValue={this.state.message} onChange={this.handleChange} />
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="10" className="m_c text-right">
                                <Button variant="primary">Send Message</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default FormComponent;