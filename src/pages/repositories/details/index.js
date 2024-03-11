import React, { useEffect } from "react";
import {
    Container,
    Row,
    Col,
    ButtonGroup,
    Button
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGithub } from "../../../hooks/useGithub";
import { Link } from "react-router-dom";

export function RepositoryDetails() {
    
    const { username, repo_name } = useParams();
    const { findRepositoryInfo, repositoryInfo } = useGithub();

    useEffect(() => {
        findRepositoryInfo(`${username}/${repo_name}`);
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <div className="mt-4 pb-4 border-bottom">
                        <h3>Detalhes do Repositório</h3>
                    </div>
                </Col>
            </Row>

            {repositoryInfo != null && (
                <>
                    <Row className="mt-5">
                        <Col>
                            <h5>Nome do Repositório</h5>
                            <span>{repositoryInfo.name}</span>
                        </Col>
                    </Row>

                    {repositoryInfo.description != null && (
                        <Row className="mt-4">
                            <Col>
                                <h5>Descrição</h5>
                                <span>{repositoryInfo.description}</span>
                            </Col>
                        </Row>
                    )}

                    {repositoryInfo.stargazers_count != null && (
                        <Row className="mt-4">
                            <Col>
                                <h5>Estrelas</h5>
                                <span>{repositoryInfo.stargazers_count}</span>
                            </Col>
                        </Row>
                    )}

                    {repositoryInfo.language != null && (
                        <Row className="mt-4">
                            <Col>
                                <h5>Linguagem de Programação</h5>
                                <span>{repositoryInfo.language}</span>
                            </Col>
                        </Row>
                    )}

                    <Row className="mt-5 border-top">
                        <Col className="mt-3">
                            <ButtonGroup>
                                <Link to={repositoryInfo.html_url} target="_blank">
                                    <Button variant="primary">
                                        Visualizar no Github
                                    </Button>
                                </Link>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
}