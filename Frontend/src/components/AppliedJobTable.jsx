import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

function AppliedJobTable() {
    return (
        <div>
            <Table />
            <Table>
                <TableCaption> List of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Jobs Roles</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1, 2, ].map((table, index) => (
                            <TableRow key={index}>
                                <TableCell>16-12-2024</TableCell>
                                <TableCell>Frontend Developer</TableCell>
                                <TableCell>Goggle</TableCell>
                                <TableCell className="text-right "><Badge>Selected</Badge></TableCell>


                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
