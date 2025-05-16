'use client'
import styles from '@/app/dashboard/clientes/clientes.module.css'
import React from "react";
import {formatDate} from "@/functions/format-Data";
import {formatPhone} from "@/functions/format-phone";
import Link from "next/link";
import {formatMoneyInput} from "@/functions/format-money";
import getPagamentos, {IPagamento} from "@/action/pagamento/get-pagamentos";
import Swal from "sweetalert2";
import updatePagamento from "@/action/pagamento/update-pagamento";
import deletePagamento from "@/action/pagamento/delete-pagamento";


export default function PagePagamentos() {
    const [data, setData] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(1);
    const [pesquisa, setPesquisa] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [idAcao, setIdAcao] = React.useState<number | null>(null);
    const [atLista, setAtLista] = React.useState(false);


    // Função para fechar o modal


    React.useEffect(() => {
        async function clientes() {
            const {pagamentos} = await getPagamentos("PENDENTE", pesquisa, currentPage);
            setData(pagamentos.data)
            setCurrentPage(pagamentos.current_page);
            setLastPage(pagamentos.last_page);
        }

        clientes();
    }, [currentPage, pesquisa, atLista])

    function handleId(value: number, whats?: string) {
        setIdAcao(value);
        if (whats) setPhone(whats);
    }

    // Função para desmarcar a linha ativa ao clicar fora
    function handleOutsideClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        // Verifica se o clique foi fora da tabela
        if (!target.closest(`.${styles.table}`) && !target.closest('.acoesTable') &&
            target.closest(`.${styles.overlay}`)) {
            setIdAcao(null);

        }
    }

    // Função para detectar a tecla Esc
    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            setIdAcao(null);
        }
    }


    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('keydown', handleKeyDown);


        return () => {
            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('keydown', handleKeyDown);

        };
    }, []);

    function handleQuitar() {
        setAtLista(false)
        Swal.fire({
            title: "Deseja quitar esse pagamento?",
            text: "você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, quitar!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "QUITADO!",
                    text: "Seu pagamento foi quitado.",
                    icon: "success"
                }).then(() => updatePagamento(Number(idAcao)).then(() => {
                    setAtLista(true)
                    setIdAcao(null)
                }));

            }
        });
    }

    function handleDeletar() {
        setAtLista(false)

        Swal.fire({
            title: "Deseja excluir esse pagamento?",
            text: "você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, deletar!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "DELETADO!",
                    text: "Seu pagamento foi deletado.",
                    icon: "success"
                }).then(() => deletePagamento(Number(idAcao))).then(() => {
                    setAtLista(true)

                });
                setIdAcao(null)
            }

        });
    }

    const pageNumbers = [];
    const maxPagesToShow = 5;

    // Cálculo das páginas ao redor da página atual
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(lastPage, startPage + maxPagesToShow - 1);

    // Corrige o início quando está no final
    const adjustedStartPage = Math.max(1, Math.min(startPage, lastPage - maxPagesToShow + 1));

    for (let i = adjustedStartPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div className="acoesTable">

                <div className="acoes">
                    {
                        idAcao ?
                            <div className="opcoesAcoes">
                                <Link href={`https://wa.me/${phone}`} target="_blank"
                                      className="btnAcoes whatsapp"></Link>
                                <Link href="#" className="btnAcoes quitar" onClick={handleQuitar}></Link>
                                <Link href="#" className="btnAcoes lixo" onClick={handleDeletar}></Link>
                            </div>

                            :

                            <button disabled className="btnPadrao">-</button>

                    }

                </div>
            </div>
            <section className={`conteiner`}>

                <div className={styles.filtro}>

                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.pesquisar}
                            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                setPesquisa(e.currentTarget.value)
                            }
                            placeholder=" "
                            required={false}

                        />
                        <label>pesquisar</label>
                    </div>
                </div>

                <div className={styles.tableContainer}>

                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Telefone</th>
                            <th>Criado</th>
                            <th>valor</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>

                        {data?.map((item: IPagamento) =>
                            <tr key={Number(item.id)} onClick={() => handleId(Number(item.id), item.client.phone)}
                                className={idAcao === Number(item.id) ? 'active' : ''}>
                                <td>{item.client.referencia}</td>
                                <td>{formatPhone(item.client.phone)}</td>
                                <td>{formatDate(item.data_criado)}</td>
                                <td>{formatMoneyInput(item.valor_debito)}</td>
                                <td><span className='pendente'>{item.status}</span></td>
                            </tr>
                        )}


                        </tbody>
                    </table>
                    <div className={styles.pagination}>
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>

                        {/* Reticências no início */}
                        {adjustedStartPage > 1 && (
                            <>
                                <button onClick={() => setCurrentPage(1)}>1</button>
                                {adjustedStartPage > 2 && <span className={styles.dots}>...</span>}
                            </>
                        )}

                        {/* Páginas Dinâmicas */}
                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                className={currentPage === number ? styles.activePage : ''}
                                onClick={() => setCurrentPage(number)}
                            >
                                {number}
                            </button>
                        ))}

                        {/* Reticências no final */}
                        {endPage < lastPage && (
                            <>
                                {endPage < lastPage - 1 && <span className={styles.dots}>...</span>}
                                <button onClick={() => setCurrentPage(lastPage)}>{lastPage}</button>
                            </>
                        )}

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, lastPage))}
                            disabled={currentPage === lastPage}
                        >
                            Próxima
                        </button>
                    </div>

                </div>
            </section>
            <div>

            </div>
        </>

    )
}