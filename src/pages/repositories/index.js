import React, { useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Table,
    ButtonGroup,
    Button
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGithub } from "../../hooks/useGithub";
import { Link } from "react-router-dom";

export function Repositories() {

    const { username } = useParams();
    const { findRepositoriesByUserId, usersRepositories } = useGithub();

    useEffect(() => {
        findRepositoriesByUserId(username);
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <div className="mt-4">
                        <h5>Repositórios</h5>
                        <small className="text-body-secondary">Lista de repositórios do usuário {username}.</small>
                    </div>
                </Col>
            </Row>

            <div className="border-top mt-4" />

            {usersRepositories != null && (
                <>
                    <Table className="mt-4" bordered striped hover>
                        <thead>
                            <th className="col-1">#ID</th>
                            <th className="col-7">Nome do repositório</th>
                            <th className="col-3">Proprietário</th>
                            <th className="col-1"></th>
                        </thead>
                        <tbody>
                            {
                                usersRepositories.map((repo) => (
                                    <tr>
                                        <td>{repo.id}</td>
                                        <td>{repo.name}</td>
                                        <td>{repo.owner.login}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={`/repository/${repo.owner.login}/${repo.name}`}>
                                                    <Button size="sm" variant="outline-info">Visualizar</Button>
                                                </Link>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
            </>
            )}
       </Container>
    );
}