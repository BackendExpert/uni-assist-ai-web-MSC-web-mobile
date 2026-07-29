import React, { useEffect, useState } from "react";
import DefaultButton from "../../component/Buttons/DefaultButton";
import { useNavigate } from "react-router-dom";

const Downloadcodes = () => {
    const navigate = useNavigate();
    const [downloaded, setDownloaded] = useState(false);
    const codeToken = localStorage.getItem("code_token");
    let codes = [];

    if (codeToken) {
        try {
            const payload = JSON.parse(atob(codeToken.split(".")[1]));
            console.log(payload);
            console.log(payload.codes);

            codes = payload.codes || [];
        } catch (err) {
            console.error("Invalid token:", err);
        }
    }


    useEffect(() => {
        if (!codeToken) {
            navigate("/login", { replace: true });
        }
    }, [codeToken, navigate]);

    if (codeToken) {
        try {
            const payload = JSON.parse(atob(codeToken.split(".")[1]));
            codes = payload.codes || [];
        } catch (err) {
            console.error("Invalid token:", err);
        }
    }

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
    };


    const downloadCodes = () => {
        const text = codes
            .map((item, index) => `${index + 1}. ${item}`)
            .join("\n");

        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "backup-codes.txt";
        a.click();

        URL.revokeObjectURL(url);

        setDownloaded(true);
    };

    const DownloadandContinue = () => {
        if (!downloaded) {
            alert("Please download your backup codes before continuing.");
            return;
        }

        localStorage.removeItem("code_token");
        navigate("/login");
    };

    return (
        <div className="bg-slate-100 dark:bg-slate-950 flex items-center justify-center py-24">
            <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 p-8 text-white">
                    <h1 className="text-3xl font-bold">
                        Backup Recovery Codes
                    </h1>

                    <p className="mt-2 text-blue-100">
                        Save these codes somewhere safe. Each code can only be used once.
                    </p>
                </div>

                <div className="p-8">

                    {codes.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {
                                    codes.map((data, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 hover:shadow-lg transition"
                                            >
                                                <div>
                                                    <p className="text-xs uppercase tracking-widest text-slate-500">
                                                        Code {index + 1}
                                                    </p>

                                                    <p className="mt-1 font-mono text-lg font-bold tracking-wider text-slate-900 dark:text-white">
                                                        {data}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => copyCode(data)}
                                                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        );
                                    })
                                }
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <button
                                    onClick={downloadCodes}
                                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                                >
                                    Download TXT
                                </button>

                                <button
                                    onClick={() => window.print()}
                                    className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-semibold transition"
                                >
                                    Print
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                            <h2 className="text-xl font-bold text-red-600">
                                No Backup Codes Found
                            </h2>

                            <p className="mt-2 text-red-500">
                                Your backup code token is missing, expired, or invalid.
                            </p>
                        </div>
                    )}

                    <div className="mt-4">
                        <DefaultButton
                            onClick={DownloadandContinue}
                            type="button"
                            label="Continue"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Downloadcodes;