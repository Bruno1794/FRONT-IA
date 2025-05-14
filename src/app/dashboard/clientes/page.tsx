'use client'
import styles from './clientes.module.css'
import React from "react";
import getClient, {IClient} from "@/action/client/get-client";
import {formatDate} from "@/functions/format-Data";
import {formatPhone} from "@/functions/format-phone";
import Link from "next/link";
import ModalModern from "@/components/modal/modal-modern";
import postRenovar from "@/action/client/post-renovar";
import Swal from 'sweetalert2'
import updateStatus from "@/action/client/update-status";
import {formatMoneyInput} from "@/functions/format-money";


export default function PageLista() {
    const [data, setData] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(1);
    const [pesquisa, setPesquisa] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [idAcao, setIdAcao] = React.useState<number | null>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpenBloqueio, setIsOpenBloqueio] = React.useState(false);
    const [cobranca, setCobranca] = React.useState(false);
    const [status, setStatus] = React.useState("Ativo");
    const [filtroStatus, setFiltroStatus] = React.useState("Ativo");
    const [tipoCobranca, setTipoCobranca] = React.useState("Mensal");
    const [valor, setValor] = React.useState("");
    const [vencimento, setVencimento] = React.useState("");

    // Função para fechar o modal
    function handleCloe() {
        setIsOpen(false);
        setIsOpenBloqueio(false);
        setCobranca(false);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

        const input = e.target.value;
        const formatted = formatMoneyInput(input);
        setValor(formatted);
    }

    function handleCloeBloqueio() {
        setIsOpenBloqueio(false);
    }

    const [state, action] = React.useActionState(postRenovar, {
        ok: false,
        error: '',
        data: null
    })
    const [stateStatus, actionStatus] = React.useActionState(updateStatus, {
        ok: false,
        error: '',
        data: null
    })

    React.useEffect(() => {
        if (state.ok) {
            Swal.fire({
                title: "Renovado com sucesso",
                icon: "success",
                confirmButtonColor: "#20232A",
                draggable: true
            });
            handleCloe();
        }
        if (stateStatus.ok) {
            Swal.fire({
                title: "Status alterado",
                icon: "success",
                confirmButtonColor: "#20232A",
                draggable: true
            });
            handleCloe();
            setFiltroStatus("Ativo");
            setStatus("Ativo");
            setTipoCobranca("Mensal");
            setVencimento("");
            setValor("");
        }

    }, [state, stateStatus])


    React.useEffect(() => {
        async function clientes() {
            const {clientes} = await getClient(currentPage, pesquisa, filtroStatus);
            setData(clientes.data)
            setCurrentPage(clientes.current_page);
            setLastPage(clientes.last_page);
        }

        clientes();
    }, [currentPage, pesquisa, state, stateStatus, filtroStatus])

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
            setIsOpen(false);
            setIsOpenBloqueio(false);
        }
    }

    React.useEffect(() => {
        setIdAcao(null);

    }, [filtroStatus])

    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('keydown', handleKeyDown);


        return () => {
            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('keydown', handleKeyDown);

        };
    }, []);

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
                                {(filtroStatus === "Ativo" || filtroStatus === "pendente") ? (
                                    <>
                                        <Link href={`/dashboard/clientes/${idAcao}`} className="btnAcoes editar"></Link>
                                        <Link href="" className="btnAcoes renovar" onClick={() => setIsOpen(true)}></Link>
                                    </>
                                ) : ""}

                                <Link href={`/dashboard/clientes/pagamentos/${idAcao}`}
                                      className="btnAcoes financeiro">
                                </Link>

                                <Link href={`https://wa.me/${phone}`} target="_blank"
                                      className="btnAcoes whatsapp"></Link>

                                {filtroStatus != "Ativo" ?
                                    <Link href="#" className="btnAcoes atualiza"
                                          onClick={() => setIsOpenBloqueio(true)}>
                                    </Link>

                                    :

                                    <Link href="#" className="btnAcoes restricao"
                                          onClick={() => setIsOpenBloqueio(true)}>
                                    </Link>
                                }
                            </div>

                            :

                            <Link href="/dashboard/clientes/novo" className="btnPadrao ">Novo</Link>

                    }

                </div>
            </div>
            <section className={`conteiner`}>

                <div className={styles.filtro}>
                    <div className={styles.formGroup}>
                        <select className={styles.filtroSelectd}
                                name="filtroStatus"
                                value={filtroStatus}
                                onChange={(e) => setFiltroStatus(e.target.value)}
                                required>
                            <option value="Ativo">Ativos</option>
                            <option value="Pendente">Pendencias</option>
                            <option value="Inativo">Inativos</option>
                            <option value="Cancelado">Cancelados</option>
                        </select>
                        <label>Filtro</label>
                    </div>
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
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Vencimento</th>
                            <th>Referencia</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>

                        {data?.map((item: IClient) =>
                            <tr key={Number(item.id)} onClick={() => handleId(Number(item.id), item.phone)}
                                className={idAcao === Number(item.id) ? 'active' : ''}>
                                <td>{item.name}</td>
                                <td>{formatPhone(item.phone)}</td>
                                <td>{formatDate(item.vencimento)}</td>
                                <td>{item.referencia ? item.referencia : "-"}</td>
                                <td>
                                    <span className={filtroStatus === "Ativo" ? 'ativo' :
                                        filtroStatus === "Pendente" ? 'pendente' :
                                            filtroStatus === "Inativo" ? 'inativo' :
                                                filtroStatus === "Cancelado" ? 'cancelado' : ''
                                    }>
                                    {item.status}
                                  </span>
                                </td>
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
                                        setCobranca(e.target.checked)}/>
                                <span className={styles.customCheckbox}></span>
                                Gerar Cobrança?
                            </label>

                        </div>


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
                        </>
                        }
                        <button className={`btnPadrao ${styles.btnModal}`}>Renovar</button>
                    </form>
                </ModalModern>
                <ModalModern isOpen={isOpenBloqueio} onClose={handleCloeBloqueio}>
                    <form action={actionStatus} className={styles.form}>
                        <h2>Situação cliente</h2>
                        <br/>
                        <input type="hidden" name="id" value={String(idAcao)}/>

                        {filtroStatus === "Inativo" || filtroStatus === "Cancelado" ?

                            <>
                                <div className={styles.formGroup}>
                                    <select
                                        name="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        required>
                                        <option value="Ativo">Ativar</option>
                                        <option value="Cancelado">Cancelar</option>
                                    </select>
                                    <label>Situação</label>
                                </div>
                                {status === "Ativo" && <>
                                    <div className={styles.formGroup}>
                                        <select
                                            name="type_cobranca"
                                            value={tipoCobranca}
                                            onChange={(e) => setTipoCobranca(e.target.value)}
                                            required>
                                            <option value="MENSAL">Mensal</option>
                                            <option value="BIMESTRAL">Bimestral</option>
                                            <option value="TRIMESTRAL">Trimestral</option>
                                            <option value="SEMESTRAL">Semestral</option>
                                            <option value="ANUAL">Anual</option>
                                        </select>
                                        <label>Cobrança</label>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <input
                                            type="date"
                                            name="vencimento"
                                            value={vencimento}
                                            onChange={e => setVencimento(e.target.value)}
                                            required/>
                                        <label>Vencimento</label>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <input
                                            type="text"
                                            name="value_mensalidade"
                                            value={valor}
                                            onChange={handleChange}
                                            placeholder=" "
                                            required={false}/>
                                        <label>Valor</label>
                                    </div>

                                    <div className={styles.checkboxGroup}>
                                        <label className={styles.checkboxWrapper}>
                                            <input
                                                type="checkbox"
                                                name="gerar_cobranca"
                                                checked={cobranca}
                                                onChange={(e) =>
                                                    setCobranca(e.target.checked)}
                                            />
                                            <span className={styles.customCheckbox}></span>
                                            Gerar Cobrança?
                                        </label>

                                    </div>
                                </>

                                }

                            </>


                            :

                            filtroStatus === "Pendente" ?
                                <div className={styles.formGroup}>
                                    <select
                                        name="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled hidden>Seleciona Situação</option>
                                        <option value="Ativo">Tirar pendencia</option>
                                        <option value="Cancelado">Cancelar</option>
                                    </select>
                                    <label>Situação</label>
                                </div>

                                :

                                <div className={styles.formGroup}>
                                    <select
                                        name="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        required>
                                        <option value="" disabled hidden>Seleciona Situação</option>
                                        <option value="Inativo">Inativar</option>
                                        <option value="Pendente">Pendencias</option>
                                        <option value="Cancelado">Cancelar</option>
                                    </select>
                                    <label>Situação</label>
                                </div>
                        }
                        <button className={`btnPadrao ${styles.btnModal}`}>Salvar</button>
                    </form>
                </ModalModern>
            </div>
        </>

    )
}