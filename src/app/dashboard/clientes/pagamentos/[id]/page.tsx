'use client'
import styles from '@/app/dashboard/clientes/clientes.module.css'
import React from "react";
import {formatDate} from "@/functions/format-Data";
import Link from "next/link";
import Swal from 'sweetalert2'
import getPagamentos, {IPagamentos} from "@/action/client/get-pagamentos";
import {formatMoneyInput} from "@/functions/format-money";
import {useParams} from "next/navigation";
import updatePagamento from "@/action/pagamento/update-pagamento";
import deletePagamento from "@/action/pagamento/delete-pagamento";


export default function PageLista() {
    const [data, setData] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(1);
    const [pesquisa, setPesquisa] = React.useState("");
    const [statusPg, setStatusPg] = React.useState("");
    const [idAcao, setIdAcao] = React.useState<number | null>(null);
    const [atLista , setAtLista] = React.useState(false);
        const {id} = useParams();
    // Função para fechar o modal


    function handleQuitar(){
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
                }).then(() =>  updatePagamento(Number(idAcao)).then(() =>  {
                    setAtLista(true)
                    setIdAcao(null)
                }) );

            }
        });
    }

    function handleDeletar(){
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
                }).then(() =>  deletePagamento(Number(idAcao)) ).then(() => {
                    setAtLista(true)
                    setIdAcao(null)
                });

            }

        });
    }




    React.useEffect(() => {
        async function pagamentos() {
            const {payments} = await getPagamentos(Number(id),pesquisa,currentPage);
            setData(payments.data)
            setCurrentPage(payments.current_page);
            setLastPage(payments.last_page);
        }

        pagamentos();
    }, [currentPage, pesquisa,atLista, id])

    function handleId(value: number, status?: string) {
        setIdAcao(value);
        if (status) setStatusPg(status);

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


    return (
        <>
            <div className="acoesTable">

                <div className="acoes">
                    {
                        idAcao ?
                            <div className="opcoesAcoes">
                                {statusPg === "PAGO" ?
                                    <Link href="#" className="btnAcoes lixo" onClick={handleDeletar}></Link>
                                    : <Link href="#" className="btnAcoes quitar" onClick={handleQuitar}></Link>}

                               {/* <Link href="" className="btnAcoes renovar" onClick={() => setIsOpen(true)}></Link>
                                <Link href="" className="btnAcoes financeiro"></Link>

                                <Link href={`https://wa.me/${phone}`} target="_blank"
                                      className="btnAcoes whatsapp"></Link>
                                <Link href="#" className="btnAcoes restricao"></Link>*/}
                            </div> :
                            <Link href="/dashboard/clientes" className="btnPadrao ">Voltar</Link>

                    }

                </div>
            </div>
            <section className={`conteiner`}>
                <input type="text" className={styles.pesquisar} placeholder="Pesquisar..."
                       onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                           setPesquisa(e.currentTarget.value)
                       }/>
                <div className={styles.tableContainer}>

                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Criado</th>
                            <th>Valor</th>
                            <th>Status</th>
                            <th>Pago</th>
                        </tr>
                        </thead>
                        <tbody>

                        {data?.map((item: IPagamentos) =>
                            <tr key={Number(item.id)} onClick={() => handleId(Number(item.id),item.status)}
                                className={idAcao === Number(item.id) ? 'active' : ''}>
                                <td>{item.id}</td>
                                <td>{formatDate(item.data_criado)}</td>
                                <td>{formatMoneyInput(item.valor_debito)}</td>
                                <td><span className={item.status === 'PAGO' ? 'ativo' : 'pendente'}>{item.status}</span></td>
                                <td>{item.data_pagamento ? formatDate(item.data_pagamento) : "-"}</td>
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

                        {Array.from({length: lastPage}, (_, i) => (
                            <button
                                key={i}
                                className={currentPage === i + 1 ? styles.activePage : ''}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}

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

{/*
                <ModalModern isOpen={isOpen} onClose={handleCloe}>

                    <form action={action} className={styles.form}>
                        <h2>Renovar Cliente</h2>
                        <input type="hidden" name="id" value={String(idAcao)}/>

                        <div className={styles.checkboxGroup}>
                            <label className={styles.checkboxWrapper}>
                                <input
                                    type="checkbox"
                                    name="gerar_cobranca"
                                    checked={cobranca}
                                    onChange={(e) =>
                                        setCobranca(e.target.checked)
                                    }
                                />
                                <span className={styles.customCheckbox}></span>
                                Gerar Cobrança?
                            </label>

                        </div>
                        <br/>

                        {cobranca && <>

                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    name="observation"
                                    placeholder=" "
                                    required={false}
                                />
                                <label>Observação</label>
                            </div>
                        </>}
                        <button className={`btnPadrao ${styles.btnModal}`}>Renovar</button>

                    </form>


                </ModalModern>
*/}
            </div>
        </>

    )
}