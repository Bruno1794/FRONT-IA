'use client'
import styles from '@/app/dashboard/clientes/clientes.module.css'
import React from "react";
import Link from "next/link";
import getNotices, {INotice} from "@/action/notices/get-notices";
import Swal from "sweetalert2";
import deleteNotice from "@/action/notices/delete-notices";
import ModalModern from "@/components/modal/modal-modern";
import postNotices from "@/action/notices/post-notices";
import {redirect} from "next/navigation";
import putNotices from "@/action/notices/put-notices";
import showNotices from "@/action/notices/show-notices";


export default function PageLista() {
    const [data, setData] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(1);
    const [pesquisa, setPesquisa] = React.useState("");
    const [day, setDay] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [idAcao, setIdAcao] = React.useState<number | null>(null);
    const [atLista, setAtLista] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpenAlt, setIsOpenAlt] = React.useState(false);


    const [state, action] = React.useActionState(postNotices, {
        ok: false,
        error: '',
        data: null
    })

    const [stateAlt, actionAl] = React.useActionState(putNotices, {
        ok: false,
        error: '',
        data: null
    })

    React.useEffect(() => {
        setAtLista(true)
        setIsOpen(false)
        setIsOpenAlt(false)
        if (state.ok) {
            Swal.fire({
                title: "Criado com sucesso",
                icon: "success",
                confirmButtonColor: "#20232A",
                draggable: true
            }).then(() => setAtLista(false))
        }

        if (stateAlt.ok) {
            Swal.fire({
                title: "Alterado com sucesso",
                icon: "success",
                confirmButtonColor: "#20232A",
                draggable: true
            }).then(() => setAtLista(false))
        }
    }, [state, stateAlt])

    // Função para fechar o modal
    function handleCloe() {
        setIsOpen(false);

    }
 function handleAbrirModal() {
        setIsOpen(true);
        setDay("");
        setMessage("");

    }

    React.useEffect(() => {
        async function loadNotices() {
            const {data} = await getNotices(pesquisa, currentPage);
            setData(data.data)
            setCurrentPage(data.current_page);
            setLastPage(data.last_page);
        }

        loadNotices();
    }, [currentPage, pesquisa, atLista])

    React.useEffect(() => {
        async function showNoticesEdit() {
            const {notice} = await showNotices(Number(idAcao));
            setDay(notice.day)
            setMessage(notice.message)

        }

        showNoticesEdit();
    }, [idAcao])

    function handleId(value: number) {
        setIdAcao(value);

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
            setIsOpenAlt(false);
            setIsOpen(false);
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

    function handleDeletar() {
        setAtLista(false)

        Swal.fire({
            title: "Deseja excluir esse noticação?",
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
                    text: "Notificação foi deletado.",
                    icon: "success"
                }).then(() => deleteNotice(Number(idAcao))).then(() => {
                    setAtLista(true)
                    setIdAcao(null)
                });

            }

        });
    }


    return (
        <>
            <div className="acoesTable">

                <div className="acoes">
                    {
                        idAcao ?
                            <div className="opcoesAcoes">
                                <Link href="#" className="btnAcoes editar" onClick={() => setIsOpenAlt(true)}></Link>
                                : <Link href="#" className="btnAcoes lixo" onClick={handleDeletar}></Link>
                            </div> :
                            <Link href="#" className="btnPadrao " onClick={handleAbrirModal}>Novo</Link>

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
                            <th>Dias</th>
                            <th>Mensagem</th>

                        </tr>
                        </thead>
                        <tbody>

                        {data?.map((item: INotice) =>
                            <tr key={Number(item.id)} onClick={() => handleId(Number(item.id))}
                                className={idAcao === Number(item.id) ? 'active' : ''}>
                                <td>{item.day}</td>
                                <td>{item.message}</td>

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
            <ModalModern isOpen={isOpen} onClose={handleCloe}>
                <form action={action} className={styles.form}>
                    <h2>MSG de Notificação</h2>
                    <br/>

                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            name="day"
                            value={day}
                            onChange={e => setDay(e.target.value)}
                            required/>
                        <label>Após quantos dias</label>
                    </div>

                    <div className={styles.formGroup}>
                        <textarea name="message" cols={20} rows={10} placeholder=" " value={message}
                                  onChange={e => setMessage(e.target.value)}
                                  required={false}></textarea>
                        <label>Mensagem de notificação</label>
                    </div>


                    <button className={`btnPadrao ${styles.btnModal}`}>Salvar</button>
                </form>
            </ModalModern>


            <ModalModern isOpen={isOpenAlt} onClose={() => setIsOpenAlt(false)}>
                <form action={actionAl} className={styles.form}>
                    <h2>MSG de Notificação</h2>
                    <br/>
                    <input type="hidden" name="id" value={String(idAcao)}/>


                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            name="day"
                            value={day}
                            onChange={e => setDay(e.target.value)}
                            required/>
                        <label>Após quantos dias</label>
                    </div>

                    <div className={styles.formGroup}>
                        <textarea name="message" cols={20} rows={10} placeholder=" " value={message}
                                  onChange={e => setMessage(e.target.value)}
                                  required={false}></textarea>
                        <label>Mensagem de notificação</label>
                    </div>


                    <button className={`btnPadrao ${styles.btnModal}`}>Salvar</button>
                </form>
            </ModalModern>
            <div>

            </div>
        </>

    )
}