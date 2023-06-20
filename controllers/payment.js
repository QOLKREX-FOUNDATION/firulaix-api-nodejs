const mercadopago = require("mercadopago");
const { mailRegisterUserWar, mailRegisterUserRenian } = require("../helpers/mail");

// response emails war
const createOrder = async (req, res) => {
    mercadopago.configure({
        access_token: process.env.MP_ACCESS_TOKEN,
    });

    console.log("req.body", JSON.stringify(req.body));

    const {
        country,
        person,
        email,
        phone,
        type,
        typeService,
        image,
        document,
        documentNumber,
        paymentMethod,
    } = req.body;

    const preference = {
        items: [
            {
                title: "Registro Completo",
                unit_price: 60,
                quantity: 1,
                currency_id: "PEN",
                // unit_price: price,
                // quantity: unit,
            },
        ],
        back_urls: {
            success: `${ process.env.HOST }/es/request/success`,
            // success: `https://war-website.vercel.app/es/request/success`,
            failure: `${ process.env.HOST }/es/request/failure`,
            // failure: `https://war-website.vercel.app/es/request/failure`,
        },
        notification_url: `https://firulaix-api-test.vercel.app/api/payment/webhook`,
        auto_return: "approved",
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "amex",
                },
            ],
            excluded_payment_types: [
                {
                    id: "atm",
                },
            ],
            installments: 6,
        },
        binary_mode: true,
        payer: {
            first_name: email,
            email,
            phone: {
                // area_code: "51",
                number: Number(phone),
            },
            identification: {
                type: type,
                number: documentNumber,
            },
            // address: {
            //     country_name: country,
            // }
        },
        metadata: {
            country,
            person,
            email,
            phone,
            type,
            typeService,
            image,
            document,
            documentNumber,
            paymentMethod,
        },
    };

    try {
        const response = await mercadopago.preferences.create(preference);
        // console.log("response", response.body)
        res.status(200).json({ data: response.body });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error });
    }
};

const createOrder2 = async (req, res) => {
    mercadopago.configure({
        access_token: process.env.MP_ACCESS_TOKEN,
    });
    console.log("req.body", JSON.stringify(req.body));

    const {
        country,
        person,
        email,
        phone,
        type,
        typeService,
        image,
        document,
        documentNumber,
        paymentMethod,
    } = req.body;

    const preference = {
        items: [
            {
                title: "Solo Registro",
                unit_price: 25,
                quantity: 1,
                currency_id: "PEN",
                // unit_price: price,
                // quantity: unit,
            },
        ],
        back_urls: {
            success: `${ process.env.HOST }/es/request/success`,
            //   success: `https://war-website.vercel.app/es/request/success`,
            failure: `${ process.env.HOST }/es/request/failure`,
            //   failure: `https://war-website.vercel.app/es/request/failure`,
        },
        notification_url: `https://firulaix-api-nodejs.vercel.app/api/payment/webhook`,
        auto_return: "approved",
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "amex",
                },
            ],
            excluded_payment_types: [
                {
                    id: "atm",
                },
            ],
            installments: 6,
        },
        binary_mode: true,
        payer: {
            first_name: email,
            email,
            phone: {
                // area_code: "51",
                number: Number(phone),
            },
            identification: {
                type: type,
                number: documentNumber,
            },
            // address: {
            //     country_name: country,
            // }
        },
        metadata: {
            country,
            person,
            email,
            phone,
            type,
            typeService,
            image,
            document,
            documentNumber,
            paymentMethod,
        },
    };

    try {
        const response = await mercadopago.preferences.create(preference);
        // console.log("response", response.body)
        res.status(200).json({ data: response.body });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error });
    }
};


const reciveWebhook = async (req, res) => {
    // console.log("webhook", req.query);
    mercadopago.configure({
        access_token: process.env.MP_ACCESS_TOKEN,
    });

    const payment = req.query;
    console.log("payment reciveWebhook", payment);

    try {
        if (payment.type === "payment") {
            const paymentInfo = await mercadopago.payment.findById(
                payment["data.id"]
            );
            console.log("paymentInfo reciveWebhook", paymentInfo);
            console.log(
                "paymentInfo reciveWebhook",
                paymentInfo.body.additional_info.items[0].title
            );
            console.log(
                "paymentInfo reciveWebhook",
                paymentInfo.body.additional_info.payer
            );

            if (paymentInfo.body.status === "approved") {
                // store in DB
                // email de confirmacion de pago
                console.log("approved");

                if (paymentInfo.body.metadata.platform === "war") {
                    await mailRegisterUserWar({
                        registry: {
                            ...paymentInfo.body.metadata,
                            id_payment: paymentInfo.body.id,
                            status: paymentInfo.body.status,
                            date_created: paymentInfo.body.date_created,
                            date_approved: paymentInfo.body.date_approved,
                            currency_id: paymentInfo.body.currency_id,
                        },
                    });

                }
                if (paymentInfo.body.metadata.platform === "renian") {

                    await mailRegisterUserRenian({
                        registry: {
                            ...paymentInfo.body.metadata,
                            id_payment: paymentInfo.body.id,
                            status: paymentInfo.body.status,
                            date_created: paymentInfo.body.date_created,
                            date_approved: paymentInfo.body.date_approved,
                            currency_id: paymentInfo.body.currency_id,
                        },
                    });
                }

                return res.status(200).json({
                    ok: true,
                    data: "approved",
                });
            }
            if (paymentInfo.body.status === "pending") {
                return res.status(200).json({
                    ok: true,
                    data: "pending",
                });
            }
            if (paymentInfo.body.status === "rejected") {
                return res.status(200).json({
                    ok: true,
                    data: "rejected",
                });
            }
        }
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ error });
    }
};

const getInfoOrder = async (req, res) => {
    // console.log("webhook", req.query);
    mercadopago.configure({
        access_token: process.env.MP_ACCESS_TOKEN,
    });

    const payment = req.query;
    // console.log("payment getInfoOrder", payment)

    try {
        // if (payment.type === "payment") {
        const paymentInfo = await mercadopago.payment.findById(payment.id);
        // console.log("paymentInfo", paymentInfo);
        console.log("paymentInfo", paymentInfo);
        // console.log("paymentInfo", paymentInfo.additional_info.items[0].title);
        // console.log("paymentInfo", paymentInfo.additional_info.payer);

        if (paymentInfo.response.status === "approved") {
            return res.status(200).json({
                ok: true,
                id: paymentInfo.response.id,
                status: paymentInfo.response.status,
                status_detail: paymentInfo.response.status_detail,
                payment_type: paymentInfo.response.payment_type,
                date_approved: paymentInfo.response.date_approved,
                date_created: paymentInfo.response.date_created,
                date_last_updated: paymentInfo.response.date_last_updated,
                transaction_amount: paymentInfo.response.transaction_amount,
                currency_id: paymentInfo.response.currency_id,
                description: paymentInfo.response.description,
                payer: paymentInfo.response.payer,
                merchant_order_id: paymentInfo.response.merchant_order_id,
                order: paymentInfo.response.order,
            });
        }
        if (paymentInfo.status === "rejected") {
            return res.status(200).json({
                ok: true,
                data: "rejected",
            });
        }

        return res.status(200).json({
            ok: false,
            data: "pending",
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            ok: false,
            error,
        });
    }
};

module.exports = {
    createOrder,
    createOrder2,
    reciveWebhook,
    getInfoOrder,
};
