import { AlbumService } from "@/api/services/album.service";
import { FileService } from "@/api/services/file.service";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { checkResponseStatus } from "@/utils/helpers";
import { IFile } from "@/utils/models/file/IFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name cannot be empty",
  }),
  year: z
    .number()
    .min(1700, {
      message: "Year must grater than 1700",
    })
    .max(Number(new Date().getFullYear()), {
      message: "Year must smaller than " + Number(new Date().getFullYear()),
    }),
  isActive: z.boolean(),
});

interface IAlbumSheetProps {
  isOpen: boolean;
  triggerEle: ReactNode;
  onCloseSheet: () => void;
  onSave: () => void;
}
export const AlbumSheet = (props: IAlbumSheetProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<IFile | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      year: 1700,
      isActive: true,
    },
  });

  useEffect(() => {
    if (id) {
      const result = fetchData();
      result.then((res) => {
        if (checkResponseStatus(res) && res?.data) {
          form.setValue("name", res?.data.name);
          form.setValue("year", res?.data.year);
          form.setValue("isActive", res?.data.isActive);
          setImageSrc(res?.data.imageUrl);
        }
      });
    } else {
      form.setValue("isActive", true);
    }
  }, [id]);

  const fetchData = () => {
    return AlbumService.get(id ?? "");
  };

  const onCloseSheet = (open: boolean) => {
    if (!open) {
      form.reset();
      setImageFile(null);
      setImageSrc("");
      props.onCloseSheet();
      navigate("/album");
    }
  };
  const renderTitle = () => {
    if (params.configType === "create") return "Create";
    else return "Edit";
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (imageFile || imageSrc) {
      const payload = {
        name: values.name,
        year: values.year,
        imageUrl: imageFile?.absoluteUri ? imageFile?.absoluteUri : imageSrc,
        isActive: values.isActive,
      };
      setIsLoading(true);
      if (params.configType === "create") {
        AlbumService.create(payload).then(async (res) => {
          if (checkResponseStatus(res)) {
            await FileService.updateObject(
              imageFile?.id ?? "",
              res?.data?.id ?? ""
            );
            toast({
              className: "fixed top-0",
              variant: "default",
              title: "Successfully",
              description: "Created an album",
            });
            setIsLoading(false);
            onCloseSheet(false);
            props.onSave();
          }
        });
      } else {
        AlbumService.update(id!, payload).then(async (res) => {
          if (checkResponseStatus(res)) {
            if (imageFile && res?.data.imageUrl !== imageFile?.absoluteUri) {
              await FileService.updateObject(
                imageFile?.id ?? "",
                res?.data?.id ?? ""
              );
            }
            toast({
              className: "fixed top-0",
              variant: "default",
              title: "Successfully",
              description: "Updated an album",
            });
            setIsLoading(false);
            onCloseSheet(false);
            props.onSave();
          }
        });
      }
    }
  };

  return (
    <Sheet open={props.isOpen} onOpenChange={onCloseSheet}>
      <SheetTrigger className="flex">{props.triggerEle}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{renderTitle()}</SheetTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Year"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            Number.isNaN(parseFloat(e.target.value))
                              ? 0
                              : parseFloat(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="space-y-1 flex flex-row items-center justify-between ">
                    <FormLabel>Is Active</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormItem className="space-y-1">
                <FormLabel>Cover image</FormLabel>
                <ImageUpload src={imageSrc} afterUpload={setImageFile} />
              </FormItem>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
