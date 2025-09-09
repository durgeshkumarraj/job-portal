import { Company } from '../models/company.model.js';

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }

        let company = await Company.findOne({ name: companyName });

        if (company) {
            return res.status(400).json({
                message: "Company already exists",
                success: false,
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id,
        });

        return res.status(200).json({
            message: "Company created successfully",
            company,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "Companies not found",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            companies,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            company,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            { name, description, website, location },
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully",
            company,
            success: true,
            
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
