import React from "react";
import {CircleSlash2, Download} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {Table, TableCell, TableHead, TableHeader, TableRow, TableBody} from "@/components/ui/table";

const DocumentsDrawer = ({row}: any) => {
  const documents = row.getValue("documents");

  function downloadFile(url: string, name: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  }
  const convertSize = (size: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (size === 0) {
      return "0 Byte";
    }
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return Math.round(size / Math.pow(1024, i)) + " " + sizes[i];
  };

  if (!documents.length) {
    return <CircleSlash2 className="text-gray-500" size={16} />;
  }
  return (
    <Drawer>
      <DrawerTrigger className="text-center" asChild>
        <Download size={16} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Your documents</DrawerTitle>
        </DrawerHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc: any) => (
              <TableRow
                key={doc.id}
                onClick={() => downloadFile(doc.url, doc.name)}
                className="cursor-pointer"
              >
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{convertSize(doc.size)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DrawerFooter>
          <DrawerClose>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DocumentsDrawer;
