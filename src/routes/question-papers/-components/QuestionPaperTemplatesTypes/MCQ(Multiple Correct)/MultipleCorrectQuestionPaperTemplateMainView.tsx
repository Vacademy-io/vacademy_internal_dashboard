import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Sliders, TrashSimple, X } from "phosphor-react";
import { Checkbox } from "@/components/ui/checkbox";
import "react-quill/dist/quill.snow.css";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import SelectField from "@/components/design-system/select-field";
import CustomInput from "@/components/design-system/custom-input";
import { MainViewQuillEditor } from "@/components/quill/MainViewQuillEditor";
import QuestionImagePreviewDialogue from "../../QuestionImagePreviewDialogue";
import { QuestionPaperTemplateFormProps } from "../../../-utils/question-paper-template-form";
import { formatStructure } from "../../../-utils/helper";
import { OptionImagePreview } from "../../options/MCQ(Multiple Correct)/OptionImagePreview";
import { QUESTION_TYPES } from "@/constants/dummy-data";

export const MultipleCorrectQuestionPaperTemplateMainView = ({
    form,
    currentQuestionIndex,
    currentQuestionImageIndex,
    setCurrentQuestionImageIndex,
    className,
}: QuestionPaperTemplateFormProps) => {
    const { control, getValues, setValue } = form;

    const answersType = getValues("answersType") || "Answer:";
    const explanationsType = getValues("explanationsType") || "Explanation:";
    const optionsType = getValues("optionsType") || "";
    const questionsType = getValues("questionsType") || "";

    const imageDetails = getValues(`questions.${currentQuestionIndex}.imageDetails`);
    const allQuestions = getValues("questions") || [];

    const option1 = getValues(`questions.${currentQuestionIndex}.multipleChoiceOptions.${0}`);
    const option2 = getValues(`questions.${currentQuestionIndex}.multipleChoiceOptions.${1}`);
    const option3 = getValues(`questions.${currentQuestionIndex}.multipleChoiceOptions.${2}`);
    const option4 = getValues(`questions.${currentQuestionIndex}.multipleChoiceOptions.${3}`);

    const handleRemovePicture = (index: number) => {
        setValue(
            `questions.${currentQuestionIndex}.imageDetails`,
            imageDetails?.filter((_, i) => i !== index),
        );
    };

    const handleRemovePictureInOptions = (optionIndex: number) => {
        setValue(
            `questions.${currentQuestionIndex}.multipleChoiceOptions.${optionIndex}.image.isDeleted`,
            true,
        );
        setValue(
            `questions.${currentQuestionIndex}.multipleChoiceOptions.${optionIndex}.image.imageFile`,
            "",
        );
        setValue(
            `questions.${currentQuestionIndex}.multipleChoiceOptions.${optionIndex}.image.imageName`,
            "",
        );
        setValue(
            `questions.${currentQuestionIndex}.multipleChoiceOptions.${optionIndex}.image.imageTitle`,
            "",
        );
    };

    if (allQuestions.length === 0) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <h1>Please add a question to show question details</h1>
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="-mb-8 flex justify-end">
                <Popover>
                    <PopoverTrigger>
                        <Button variant="outline" type="button" className="cursor-pointer px-3">
                            <Sliders size={32} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="mb-2 flex flex-col gap-4">
                            <div className="flex w-full items-center justify-between">
                                <h1 className="text-primary-500">Questions Settings</h1>
                                <PopoverClose>
                                    <X size={16} />
                                </PopoverClose>
                            </div>
                            <SelectField
                                label="Question Type"
                                name={`questions.${currentQuestionIndex}.questionType`}
                                options={QUESTION_TYPES.map((option, index) => ({
                                    value: option,
                                    label: option,
                                    _id: index,
                                }))}
                                control={form.control}
                                className="!w-full"
                                required
                            />
                            <CustomInput
                                control={form.control}
                                name={`questions.${currentQuestionIndex}.questionMark`}
                                label="Marks"
                                required
                            />
                            <CustomInput
                                control={form.control}
                                name={`questions.${currentQuestionIndex}.questionPenalty`}
                                label="Negative Marking"
                                required
                            />
                            <div className="flex flex-col gap-2">
                                <h1 className="text-sm font-semibold">Time Limit</h1>
                                <div className="flex items-center gap-4 text-sm">
                                    <CustomInput
                                        control={form.control}
                                        name={`questions.${currentQuestionIndex}.questionDuration.hrs`}
                                        label=""
                                        className="w-10"
                                    />
                                    <span>hrs</span>
                                    <span>:</span>
                                    <CustomInput
                                        control={form.control}
                                        name={`questions.${currentQuestionIndex}.questionDuration.min`}
                                        label=""
                                        className="w-10"
                                    />
                                    <span>min</span>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex w-full flex-col !flex-nowrap items-start gap-1">
                <span>
                    Question&nbsp;
                    {questionsType
                        ? formatStructure(questionsType, currentQuestionIndex + 1)
                        : currentQuestionIndex + 1}
                </span>
                <FormField
                    control={control}
                    name={`questions.${currentQuestionIndex}.questionName`}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <MainViewQuillEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="flex flex-wrap items-end justify-center gap-8">
                {Array.isArray(allQuestions) &&
                    allQuestions.length > 0 &&
                    Array.isArray(imageDetails) &&
                    imageDetails.length > 0 &&
                    imageDetails.map((imgDetail, index) => {
                        return (
                            <div className="flex w-72 flex-col" key={index}>
                                <div className="h-64 w-72 items-center justify-center bg-black !p-0">
                                    <img
                                        src={imgDetail.imageFile}
                                        alt="logo"
                                        className="h-64 w-96"
                                    />
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-sm">{imgDetail.imageTitle}</span>
                                    <div className="flex items-center gap-4">
                                        <QuestionImagePreviewDialogue
                                            form={form}
                                            currentQuestionIndex={currentQuestionIndex}
                                            currentQuestionImageIndex={index}
                                            setCurrentQuestionImageIndex={
                                                setCurrentQuestionImageIndex
                                            }
                                            isUploadedAgain={true}
                                        />
                                        <Button
                                            variant="outline"
                                            className="p-0 px-2"
                                            onClick={() => handleRemovePicture(index)}
                                        >
                                            <TrashSimple size={32} className="text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                {Array.isArray(imageDetails) && imageDetails.length < 4 && (
                    <QuestionImagePreviewDialogue
                        form={form}
                        currentQuestionIndex={currentQuestionIndex}
                        currentQuestionImageIndex={currentQuestionImageIndex}
                        setCurrentQuestionImageIndex={setCurrentQuestionImageIndex}
                    />
                )}
            </div>

            <div className="flex w-full grow flex-col gap-4">
                <span className="-mb-3">{answersType}</span>
                <div className="flex gap-4">
                    <div
                        className={`flex w-1/2 items-center justify-between gap-4 rounded-md bg-neutral-100 p-4 ${
                            option1.isSelected ? "border border-primary-300 bg-primary-50" : ""
                        }`}
                    >
                        <div className="flex w-full items-center gap-4">
                            <div className="flex size-10 items-center justify-center rounded-full bg-white px-3">
                                <span className="!p-0 text-sm">
                                    {optionsType ? formatStructure(optionsType, "a") : "(a.)"}
                                </span>
                            </div>
                            {option1?.image?.imageFile ? (
                                <div className="flex w-72 flex-col">
                                    <div className="h-64 w-72 items-center justify-center bg-black !p-0">
                                        <img
                                            src={option1.image.imageFile}
                                            alt="logo"
                                            className="h-64 w-96"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-sm">{option1.image.imageTitle}</span>
                                        <div className="flex items-center gap-4">
                                            <OptionImagePreview
                                                form={form}
                                                option={0}
                                                isUploadedAgain={true}
                                                currentQuestionIndex={currentQuestionIndex}
                                            />
                                            <Button
                                                variant="outline"
                                                className="p-0 px-2"
                                                onClick={() => handleRemovePictureInOptions(0)}
                                            >
                                                <TrashSimple size={32} className="text-red-500" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <FormField
                                    control={control}
                                    name={`questions.${currentQuestionIndex}.multipleChoiceOptions.${0}.name`}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <MainViewQuillEditor
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            {!option1?.image?.imageFile && (
                                <OptionImagePreview
                                    form={form}
                                    option={0}
                                    currentQuestionIndex={currentQuestionIndex}
                                />
                            )}
                        </div>
                        <div className="flex size-10 items-center justify-center rounded-full bg-white px-4">
                            <FormField
                                control={control}
                                name={`questions.${currentQuestionIndex}.multipleChoiceOptions.${0}.isSelected`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className={`mt-1 size-5 border-2 shadow-none ${
                                                    field.value
                                                        ? "border-none bg-green-500 text-white" // Blue background and red tick when checked
                                                        : "" // Default styles when unchecked
                                                }`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div
                        className={`flex w-1/2 items-center justify-between gap-4 rounded-md bg-neutral-100 p-4 ${
                            option2.isSelected ? "border border-primary-300 bg-primary-50" : ""
                        }`}
                    >
                        <div className="flex w-full items-center gap-4">
                            <div className="flex size-10 items-center justify-center rounded-full bg-white px-3">
                                <span className="!p-0 text-sm">
                                    {optionsType ? formatStructure(optionsType, "b") : "(b.)"}
                                </span>
                            </div>
                            {option2?.image?.imageFile ? (
                                <div className="flex w-72 flex-col">
                                    <div className="h-64 w-72 items-center justify-center bg-black !p-0">
                                        <img
                                            src={option2.image.imageFile}
                                            alt="logo"
                                            className="h-64 w-96"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-sm">{option2.image.imageTitle}</span>
                                        <div className="flex items-center gap-4">
                                            <OptionImagePreview
                                                form={form}
                                                option={1}
                                                isUploadedAgain={true}
                                                currentQuestionIndex={currentQuestionIndex}
                                            />
                                            <Button
                                                variant="outline"
                                                className="p-0 px-2"
                                                onClick={() => handleRemovePictureInOptions(1)}
                                            >
                                                <TrashSimple size={32} className="text-red-500" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <FormField
                                    control={control}
                                    name={`questions.${currentQuestionIndex}.multipleChoiceOptions.${1}.name`}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <MainViewQuillEditor
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            {!option2?.image?.imageFile && (
                                <OptionImagePreview
                                    form={form}
                                    option={1}
                                    currentQuestionIndex={currentQuestionIndex}
                                />
                            )}
                        </div>
                        <div className="flex size-10 items-center justify-center rounded-full bg-white px-4">
                            <FormField
                                control={control}
                                name={`questions.${currentQuestionIndex}.multipleChoiceOptions.${1}.isSelected`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className={`mt-1 size-5 border-2 shadow-none ${
                                                    field.value
                                                        ? "border-none bg-green-500 text-white" // Blue background and red tick when checked
                                                        : "" // Default styles when unchecked
                                                }`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div
                        className={`flex w-1/2 items-center justify-between gap-4 rounded-md bg-neutral-100 p-4 ${
                            option3.isSelected ? "border border-primary-300 bg-primary-50" : ""
                        }`}
                    >
                        <div className="flex w-full items-center gap-4">
                            <div className="flex size-10 items-center justify-center rounded-full bg-white px-3">
                                <span className="!p-0 text-sm">
                                    {optionsType ? formatStructure(optionsType, "c") : "(c.)"}
                                </span>
                            </div>
                            {option3?.image?.imageFile ? (
                                <div className="flex w-72 flex-col">
                                    <div className="h-64 w-72 items-center justify-center bg-black !p-0">
                                        <img
                                            src={option3.image.imageFile}
                                            alt="logo"
                                            className="h-64 w-96"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-sm">{option3.image.imageTitle}</span>
                                        <div className="flex items-center gap-4">
                                            <OptionImagePreview
                                                form={form}
                                                option={2}
                                                isUploadedAgain={true}
                                                currentQuestionIndex={currentQuestionIndex}
                                            />
                                            <Button
                                                variant="outline"
                                                className="p-0 px-2"
                                                onClick={() => handleRemovePictureInOptions(2)}
                                            >
                                                <TrashSimple size={32} className="text-red-500" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <FormField
                                    control={control}
                                    name={`questions.${currentQuestionIndex}.multipleChoiceOptions.${2}.name`}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <MainViewQuillEditor
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            {!option3?.image?.imageFile && (
                                <OptionImagePreview
                                    form={form}
                                    option={2}
                                    currentQuestionIndex={currentQuestionIndex}
                                />
                            )}
                        </div>
                        <div className="flex size-10 items-center justify-center rounded-full bg-white px-4">
                            <FormField
                                control={control}
                                name={`questions.${currentQuestionIndex}.multipleChoiceOptions.${2}.isSelected`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className={`mt-1 size-5 border-2 shadow-none ${
                                                    field.value
                                                        ? "border-none bg-green-500 text-white" // Blue background and red tick when checked
                                                        : "" // Default styles when unchecked
                                                }`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div
                        className={`flex w-1/2 items-center justify-between gap-4 rounded-md bg-neutral-100 p-4 ${
                            option4.isSelected ? "border border-primary-300 bg-primary-50" : ""
                        }`}
                    >
                        <div className="flex w-full items-center gap-4">
                            <div className="flex size-10 items-center justify-center rounded-full bg-white px-3">
                                <span className="!p-0 text-sm">
                                    {optionsType ? formatStructure(optionsType, "d") : "(d.)"}
                                </span>
                            </div>
                            {option4?.image?.imageFile ? (
                                <div className="flex w-72 flex-col">
                                    <div className="h-64 w-72 items-center justify-center bg-black !p-0">
                                        <img
                                            src={option4.image.imageFile}
                                            alt="logo"
                                            className="h-64 w-96"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-sm">{option4.image.imageTitle}</span>
                                        <div className="flex items-center gap-4">
                                            <OptionImagePreview
                                                form={form}
                                                option={3}
                                                isUploadedAgain={true}
                                                currentQuestionIndex={currentQuestionIndex}
                                            />
                                            <Button
                                                variant="outline"
                                                className="p-0 px-2"
                                                onClick={() => handleRemovePictureInOptions(3)}
                                            >
                                                <TrashSimple size={32} className="text-red-500" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <FormField
                                    control={control}
                                    name={`questions.${currentQuestionIndex}.multipleChoiceOptions.${3}.name`}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <MainViewQuillEditor
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            {!option4?.image?.imageFile && (
                                <OptionImagePreview
                                    form={form}
                                    option={3}
                                    currentQuestionIndex={currentQuestionIndex}
                                />
                            )}
                        </div>
                        <div className="flex size-10 items-center justify-center rounded-full bg-white px-4">
                            <FormField
                                control={control}
                                name={`questions.${currentQuestionIndex}.multipleChoiceOptions.${3}.isSelected`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className={`mt-1 size-5 border-2 shadow-none ${
                                                    field.value
                                                        ? "border-none bg-green-500 text-white" // Blue background and red tick when checked
                                                        : "" // Default styles when unchecked
                                                }`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-col !flex-nowrap items-start gap-1">
                <span>{explanationsType}</span>
                <FormField
                    control={control}
                    name={`questions.${currentQuestionIndex}.explanation`}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <MainViewQuillEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};
