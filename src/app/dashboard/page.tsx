'use client'
import styles from './index.module.css'
import styleForm from "@/app/dashboard/clientes/clientes.module.css"
import React from "react";
import {formatPhone} from "@/functions/format-phone";
import getClientNovos from "@/action/client/get-client-novos";
import {IClient} from "@/action/client/get-client";
import Image from "next/image";
import ModalModern from "@/components/modal/modal-modern";
import {formatMoneyInput} from "@/functions/format-money";
import ativaClient from "@/action/client/put-ativa-client";
import Swal from "sweetalert2";
import {redirect} from "next/navigation";
import deleteClient from "@/action/client/delete-client";
import geContClient from "@/action/client/get-cont-client";
import getDadosPagamentos from "@/action/pagamento/get-dados-pagamentos";
import {formatMoneySemSifra} from "@/functions/format-money-sem-sifra";


export default function PageLista() {
    const [data, setData] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [tipoCobranca, setTipoCobranca] = React.useState("Mensal");
    const [vencimento, setVencimento] = React.useState("");
    const [valor, setValor] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [referencia, setReferencia] = React.useState("");
    const [id, setId] = React.useState("");
    const [lista, setAtLista] = React.useState(false);
    const[novo, setNovo] = React.useState("");
    const[ativo, setAtivo] = React.useState("");
    const[inativo, setInativo] = React.useState("");
    const [filtro, setFiltro] = React.useState("hoje");
    const[qtd, setQtd] = React.useState("");
    const[recebidos, setRecebidos] = React.useState("");
    const[pendente, setPendente] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const [state, action] = React.useActionState(ativaClient, {
        ok: false,
        error: '',
        data: null
    });


    if (state) {
        if (state.ok) {
            Swal.fire({
                title: "Ativado com sucesso!",
                icon: "success",
                confirmButtonColor: "#20232A",
                draggable: true
            }).then(() => {
                redirect('/dashboard/clientes');
            })
        }
    }


    function handleCloe() {
        setIsOpen(false);
        setTipoCobranca("Mensal");
        setVencimento("");
        setValor("");
    }

    function handleDados(value: string, id: string) {
        setNome(value);
        setId(id);
        setIsOpen(true)

    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

        const input = e.target.value;
        const formatted = formatMoneyInput(input);
        setValor(formatted);
    }

    React.useEffect(() => {
        async function clientes() {
            const {clientes} = await getClientNovos();
            setData(clientes)

        }

        clientes();
    }, [state, lista])

    React.useEffect(() => {
        setLoading(true);
        async function loandQuantidae() {
            const {clientes} = await geContClient(filtro);
            setNovo(clientes.novos)
            setAtivo(clientes.ativos)
            setInativo(clientes.inativos)
            setLoading(false);

        }
        loandQuantidae();
    }, [filtro])

    React.useEffect(() => {
        setLoading(true);
        async function loandDadosPG() {
            const {pagamentos} = await getDadosPagamentos(filtro);
            setQtd(pagamentos.qtd)
            setRecebidos(pagamentos.recebidos)
            setPendente(pagamentos.pendente)
            setLoading(false);

        }
        loandDadosPG();
    }, [filtro])

    function handleDeletar(id: string) {


        Swal.fire({
            title: "Deseja excluir esse cliente?",
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
                    text: "Cliente foi deletado.",
                    icon: "success"
                }).then(() => deleteClient(Number(id))).then(() => {
                    setAtLista(true)

                });

            }

        });
    }

    return (
        <>
            <section className={`conteiner`}>
                <div>
                    <div className={styles.formGroup}>
                        <select
                            name="filtro"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                            required>
                            <option value="" disabled hidden>Filtro</option>
                            <option value="hoje">Hoje</option>
                            <option value="Semanal">Semanal</option>
                            <option value="Mensal">Mensal</option>
                            <option value="Anual">Anual</option>

                        </select>
                        <label>Filtro</label>
                    </div>
                </div>
                <div className={styles.dados}>
                    <div className={styles.bloco}>
                        <p><span className={styles.novo}>NOVOS</span></p>
                        {loading ? <p>Carregando...</p> :  <h1>{novo}</h1>}
                        <p>{filtro}</p>
                    </div>
                    <div className={styles.bloco}>
                        <p><span className="ativo">ATIVOS</span></p>
                        {loading ? <p>Carregando...</p> :  <h1>{ativo}</h1>}
                        <p>{filtro}</p>
                    </div>
                    <div className={styles.bloco}>
                        <p><span className="inativo">INATIVOS</span></p>
                        {loading ? <p>Carregando...</p> :  <h1>{inativo}</h1>}
                        <p>{filtro}</p>
                    </div>
                </div>

                <div className={styles.dados}>
                    <div className={styles.bloco}>
                        <p><span className={styles.qtdPg}>QTD</span></p>
                        {loading ? <p>Carregando...</p> :  <h1>{qtd}</h1>}
                        <p>{filtro}</p>
                    </div>
                    <div className={styles.bloco}>
                        <p><span className="ativo">RECEBIDOS</span></p>
                        {loading ? <p>Carregando...</p> :  <h1 className={styles.money}>{recebidos ? formatMoneySemSifra(recebidos) : "0" }</h1>}
                        <p>{filtro}</p>
                    </div>
                    <div className={styles.bloco}>
                        <p><span className="pendente">PENDENTE</span></p>
                        {loading ? <p>Carregando...</p> :  <h1 className={styles.money}>{pendente ? formatMoneySemSifra(pendente): "0"}</h1>}
                        <p>{filtro}</p>
                    </div>
                </div>

            </section>
            <br/>

            <section className={`conteiner`}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Status</th>
                            <th>Ação</th>
                        </tr>
                        </thead>
                        <tbody>

                        {data?.map((item: IClient) =>
                            <tr key={Number(item.id)}>
                                <td>{item.name}</td>
                                <td>{formatPhone(item.phone)}</td>
                                <td><span className={styles.novo}>Contato</span></td>
                                <td>
                                    <div className={styles.btnsNovo}>
                                        <Image src="/img/alterar-mini.png" alt="" width={24} height={24}
                                               className={styles.btnEditar}
                                               onClick={() => handleDados(item.name, item.id)}/>

                                        <Image src="/img/lixo-mini.png" alt="" width={24} height={24}
                                               className={styles.btnEditar}
                                               onClick={() => handleDeletar(item.id)}/>

                                    </div>

                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>


                    <ModalModern isOpen={isOpen} onClose={handleCloe}>
                        <form action={action} className={styleForm.form}>
                            <h2>Ativar Cliente</h2>
                            <br/>
                            <input type="hidden" name="id" value={id}/>
                            <div className={styleForm.formGroup}>
                                <input
                                    type="text"
                                    name="name"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                    placeholder=" "
                                    required={true}
                                />
                                <label>Nome</label>
                            </div>

                            <div className={styleForm.formGroup}>
                                <input
                                    type="text"
                                    name="referencia"
                                    value={referencia}
                                    onChange={e => setReferencia(e.target.value)}
                                    placeholder=" "
                                    required={false}
                                />
                                <label>Referencia</label>
                            </div>

                            <div className={styleForm.formGroup}>
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

                            <div className={styleForm.formGroup}>
                                <input
                                    type="date"
                                    name="vencimento"
                                    value={vencimento}
                                    onChange={e => setVencimento(e.target.value)}
                                    required/>
                                <label>Vencimento</label>
                            </div>
                            <div className={styleForm.formGroup}>
                                <input
                                    type="text"
                                    name="value_mensalidade"
                                    value={valor}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required={false}/>
                                <label>Valor</label>
                            </div>


                            <button className={`btnPadrao ${styleForm.btnModal}`}>Salvar</button>
                        </form>
                    </ModalModern>


                </div>
            </section>
            <div>


            </div>
        </>

    )
}