import React, { useState } from "react";
import { 
    Container,
    ButtonGroup,
    Button,
    Row,
    Col,
    Image,
    Stack,
    InputGroup,
    Form
} from "react-bootstrap";
import { useGithub } from "../../hooks/useGithub"; 
import { Link } from "react-router-dom";

export function Home() {

    const [username, setUsername] = useState();

    const { findUserProfile, user } = useGithub();

    async function searchUser() {
        await findUserProfile(username);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div className="mt-4">
                        <h5>Usuário do Github</h5>
                        <small className="text-body-secondary">Insira um nome de usuário do github para visualizar informações do perfil.</small>
                    </div>
                    <div className="mt-4">
                        <InputGroup>
                            <Form.Control 
                                placeholder="usuário do github" 
                                onChange={(item) => setUsername(item.target.value)} 
                            />
                            <Button 
                                variant="primary"
                                onClick={() => searchUser()}
                            >Pesquisar</Button>
                        </InputGroup>
                    </div>
                </Col>
            </Row>

            {user != null && (
                <>
                    <Row className="mt-5">
                        <Col>
                            <h2>Resultado da Busca</h2>
                        </Col>
                    </Row>

                    <div className="border rounded p-4 mt-4 mb-4">
                        <Row md={6}>
                            <Col md={3}>
                                <Image src={user.avatar_url} roundedCircle width={250} height={250} />
                            </Col>
                            <Col md={9}>
                                <Stack gap={3}>
                                    <div className="p-2">
                                        <h4>Usuário</h4>
                                        <span>{user.login}</span>
                                    </div>

                                    <div className="p-2">
                                        <h4>Seguidores</h4>
                                        <span>{user.followers}</span>
                                    </div>

                                    <div className="p-2">
                                        <h4>Seguindo</h4>
                                        <span>{user.following}</span>
                                    </div>
                                </Stack>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col>
                                <ButtonGroup>
                                    <Link to={`/users/${user.login}/repositories`}>
                                        <Button>Repositórios</Button>
                                    </Link>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </div>
                </>
            )}

        </Container>
    );
}