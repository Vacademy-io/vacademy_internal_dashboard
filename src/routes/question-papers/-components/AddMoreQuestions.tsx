import { Button } from "@/components/ui/button";
import { X } from "phosphor-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useDialogStore from "../-global-states/question-paper-dialogue-close";
import { useState } from "react";

export default function AddMoreQuestions() {
    const [open, onOpen] = useState<boolean>(false);
    const {
        isManualQuestionPaperDialogOpen,
        isUploadFromDeviceDialogOpen,
        setIsManualQuestionPaperDialogOpen,
        setIsUploadFromDeviceDialogOpen,
    } = useDialogStore();
    return (
        <AlertDialog open={open} onOpenChange={onOpen}>
            <AlertDialogTrigger>Add More Questions</AlertDialogTrigger>
            <AlertDialogContent className="p-0">
                <div className="flex items-center justify-between rounded-md bg-primary-50">
                    <h1 className="rounded-sm p-4 text-primary-500">Add Questions</h1>
                    <AlertDialogCancel
                        onClick={() => onOpen(false)}
                        className="border-none bg-primary-50 shadow-none hover:bg-primary-50"
                    >
                        <X className="text-neutral-600" />
                    </AlertDialogCancel>
                </div>
                <div className="mb-6 mt-2 flex flex-col items-center justify-center gap-6">
                    {/* Create Manually Dialog */}
                    <AlertDialog
                        open={isManualQuestionPaperDialogOpen}
                        onOpenChange={setIsManualQuestionPaperDialogOpen}
                    >
                        <AlertDialogTrigger>
                            <Button variant="outline" className="w-40 text-neutral-600">
                                Add Manually
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="p-0">
                            <div className="flex items-center justify-between rounded-md bg-primary-50">
                                <h1 className="rounded-sm p-4 font-bold text-primary-500">
                                    Add Questions Paper Manually
                                </h1>
                                <AlertDialogCancel
                                    onClick={() => setIsManualQuestionPaperDialogOpen(false)}
                                    className="border-none bg-primary-50 shadow-none hover:bg-primary-50"
                                >
                                    <X className="text-neutral-600" />
                                </AlertDialogCancel>
                            </div>
                            {/* <QuestionPaperUpload
                                    isManualCreated={true}
                                    currentQuestionIndex={currentQuestionIndex}
                                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                                    currentQuestionImageIndex={currentQuestionImageIndex}
                                    setCurrentQuestionImageIndex={setCurrentQuestionImageIndex}
                                /> */}
                        </AlertDialogContent>
                    </AlertDialog>

                    {/* Upload from Device Dialog */}
                    <AlertDialog
                        open={isUploadFromDeviceDialogOpen}
                        onOpenChange={setIsUploadFromDeviceDialogOpen}
                    >
                        <AlertDialogTrigger>
                            <Button variant="outline" className="w-40 text-neutral-600">
                                Upload from Device
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="p-0">
                            <div className="flex items-center justify-between rounded-md bg-primary-50">
                                <h1 className="rounded-sm p-4 font-bold text-primary-500">
                                    Upload Questions From Device
                                </h1>
                                <AlertDialogCancel
                                    onClick={() => setIsUploadFromDeviceDialogOpen(false)}
                                    className="border-none bg-primary-50 shadow-none hover:bg-primary-50"
                                >
                                    <X className="text-neutral-600" />
                                </AlertDialogCancel>
                            </div>
                            {/* <QuestionPaperUpload
                                    isManualCreated={false}
                                    currentQuestionIndex={currentQuestionIndex}
                                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                                    currentQuestionImageIndex={currentQuestionImageIndex}
                                    setCurrentQuestionImageIndex={setCurrentQuestionImageIndex}
                                /> */}
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
