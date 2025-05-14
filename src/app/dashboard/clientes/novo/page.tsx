'use client'
import styles from '../clientes.module.css'
import React from "react";
import Link from "next/link";
import {formatPhone} from "@/functions/format-phone";
import {formatCPF} from "@/functions/format-cpf";
import {formatMoneyInput} from "@/functions/format-money";
import postClient from "@/action/client/post-client";
import {redirect} from "next/navigation";
import Swal from "sweetalert2";

export default function NovoClientePage() {

    const [phone, setPhone] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const [vencimento, setVencimento] = React.useState("");
    const [valor, setValor] = React.useState("");
    const [avisar, setAvisar] = React.useState("");
    const [referencia, setReferencia] = React.useState("");
    const [cobranca, setCobranca] = React.useState("MENSAL");
    const [preferencia, setPreferencia] = React.useState("");
    const [cobrar, setCobrar] = React.useState(false);


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

        const input = e.target.value;
        const formatted = formatMoneyInput(input);
        setValor(formatted);
    }

    const handleLimitInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        // Limita a entrada para 2 caracteres numéricos
        if (/^\d{0,1}$/.test(input)) {
            setAvisar(input);
        }
    };

    const [state, actiion] = React.useActionState(postClient, {
        ok: false,
        error: '',
        data: null
    })
    if (state.ok) {
        if (state.ok)
            Swal.fire({
                title: "Criado com sucesso",
                icon: "success",
                confirmButtonColor: "#20232A",
                draggable: true
            }).then(() => {
                redirect('/dashboard/clientes');
            })

    }

    return (
        <>
            <div className="acoesTable">
                <div className="acoes">
                    <Link href="/dashboard/clientes" className="btnPadrao">Voltar</Link>
                </div>
            </div>
            <section className={`conteiner ${styles.section}`}>
                <form className={styles.form} action={actiion}>


                    <div className={styles.agrupar}>
                        <div className={styles.formGroup}>
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

                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                name="cpf"
                                value={cpf}
                                onChange={e => setCpf(formatCPF(e.target.value))}
                                placeholder=" "
                                required={false}
                            />
                            <label>Cpf</label>
                        </div>
                    </div>

                    <div className={styles.agrupar}>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                name="phone"
                                value={phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setPhone(formatPhone(e.target.value))
                                }}
                                placeholder=" "
                                required={true}

                            />
                            <label>Telefone</label>
                        </div>

                        <div className={styles.formGroup}>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setEmail(e.target.value)
                                }}
                                placeholder=" "
                                required={false}
                            />
                            <label>E-mail</label>
                        </div>
                    </div>
                    <div className={styles.agrupar}>
                        <div className={styles.formGroup}>
                            <input
                                type="date"
                                name="vencimento"
                                value={vencimento}
                                onChange={e => setVencimento(e.target.value)}
                                required
                            />
                            <label>Vencimento</label>
                        </div>

                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                name="value_mensalidade"
                                value={valor}
                                onChange={handleChange}
                                placeholder=" "
                                required={false}
                            />
                            <label>Valor</label>
                        </div>
                    </div>
                    <div className={styles.agrupar}>
                        <div className={styles.formGroup}>
                            <input
                                type="number"
                                name="avisar"
                                value={avisar}
                                onChange={handleLimitInput}
                                maxLength={2}
                                placeholder=" "
                                required={false}

                            />
                            <label>Avisar cobrança</label>
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                name="referencia"
                                value={referencia}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setReferencia(e.target.value)
                                }}
                                placeholder=" "
                                required={false}

                            />
                            <label>Referencia</label>
                        </div>
                    </div>


                    <div className={styles.formGroup}>
                        <select
                            name="preferencia"
                            value={preferencia}
                            onChange={(e) => setPreferencia(e.target.value)}
                            required
                        >
                            <option value="" disabled hidden>Preferencia de pagamento</option>
                            <option value="PIX">PIX</option>
                            <option value="CARTAO">CARTAO</option>
                            <option value="BOLETO">BOLETO</option>
                            <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                        </select>
                        <label>Preferencia</label>
                    </div>

                    <div className={styles.formGroup}>
                        <textarea name="observation" cols={20} rows={5} placeholder=" "
                                  required={false}></textarea>
                        <label>Observações</label>
                    </div>


                    <div className={styles.radioGroup}>
                        <label className={styles.radioTitle}>Tipo de cobrança:</label>
                        <div className={styles.radioOptions}>
                            {['MENSAL', 'BIMESTRAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL'].map((plano) => (
                                <label key={plano} className={styles.radioWrapper}>
                                    <input
                                        type="radio"
                                        name="type_cobranca"
                                        value={plano}
                                        checked={cobranca === plano}
                                        onChange={(e) => setCobranca(e.target.value)}
                                    />
                                    <span className={styles.customRadio}></span>
                                    {plano}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={styles.checkboxGroup}>
                        <label className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                name="cobrar"
                                checked={cobrar}
                                onChange={(e) =>
                                    setCobrar(e.target.checked)
                                }
                            />
                            <span className={styles.customCheckbox}></span>
                            Não enviar cobrança
                        </label>
                    </div>

                    <button type="submit" className="btnPadrao">
                        Salvar
                    </button>
                </form>

            </section>
        </>
    )
}