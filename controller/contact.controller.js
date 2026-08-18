import Contact from "../models/contacts.model.js"
import mongoose from "mongoose"

export const getContacts = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query
        const options = {
            page: parseInt(page),
            limit: parseInt(limit)
        }
        // const contacts = await Contact.find()
        const result = await Contact.paginate({}, options)
        // res.send(result)
        // res.json(contacts)
        res.render('home', {
            totalDocs: result.totalDocs,
            limit: result.limit,
            totalPages: result.totalPages,
            currentPage: result.page,
            counter: result.pagingCounter,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            contacts : result.docs
        })


    } catch (error) {
        res.render('500', { message: error })
    }
}

export const getContact = async (req, res) => {
    // var paramId = mongoose.Types.ObjectId.isValid(req.params.id)

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.render('404', { message: "Invalid Id" })
    }

    try {
        const contact = await Contact.findById(req.params.id)
        //    res.json(contact)
        if (!contact) return res.render('404', { message: "Contact not found." })
        res.render('show-contact', { contact })
    } catch (error) {
        res.render('500', { message: error })
    }

}

export const addContactPage = (req, res) => {
    res.render('add-contact')
}

export const addContact = async (req, res) => {

    try {
        await Contact.create(req.body)
        // const conatct = await Contact.insertOne({
        //     first_name:req.body.first_name,
        //     last_name:req.body.last_name,
        //     email:req.body.email,
        //     phone:req.body.phone,
        //     address:req.body.address
        // })

        //    res.send(req.body)
        res.redirect("/")
    } catch (error) {
        res.render('500', { message: error })
    }

}

export const updateContactPage = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.render('404', { message: "Invalid Id" })
    }

    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) return res.render('404', { message: "Contact not found." })
        res.render('update-contact', { contact })
    } catch (error) {
        res.render('500', { message: error })
    }

}

export const updateContact = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.render('404', { message: "Invalid Id" })
    }
    // res.send(req.body)

    try {
        const { first_name, last_name, email, phone, address } = req.body
        const contact = await Contact.findByIdAndUpdate(req.params.id, { first_name, last_name, email, phone, address })
        if (!contact) return res.render('404', { message: "Contact not found." })
        res.redirect("/")
    } catch (error) {
        res.render('500', { message: error })
    }


}

export const deleteContact = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.render('404', { message: "Invalid Id" })
    }

    try {
        const contact = await Contact.findByIdAndDelete(req.params.id)
        if (!contact) return res.render('404', { message: "Contact not found." })
        res.redirect("/")
    } catch (error) {
        res.render('500', { message: error })
    }
}


