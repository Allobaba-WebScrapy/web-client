import React from "react";
// import { BellIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  Loader2, LucideArrowRight } from "lucide-react";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    downloadCardsAsCsv,
    downloadCardsAsJson,
    downloadCardsAsXml,
} from "@/lib/pagesjaunes_utils";

type Step = {
    type: string;
    progress: string;
    cardsNumbers?: number;
};
type CardProps = React.ComponentProps<typeof Card>;

const LoadingPage: React.FC = ({ className, ...props }: CardProps) => {
    const progress = useSelector(
        (state: RootState) => state.pagesJaunes.progress
    );
    const isLoading = useSelector(
        (state: RootState) => state.pagesJaunes.loading
    );
    const navigate = useNavigate();
    return (
        <div className="h-full w-full">
            {/* ----------------------------------------------- */}
            <Card className={cn("w-[600px]", className)} {...props}>
                <CardHeader>
                    <CardTitle>Progress</CardTitle>
                    <CardDescription>
                        You have {progress.length} step passed.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div>
                        {progress.map((step: Step, index: number) => (
                            <div
                                key={index}
                                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                            >
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {step.progress}
                                    </p>
                                    {step.cardsNumbers !== undefined && (
                                        <p className="font-normal text-black">
                                            {step.cardsNumbers} cards scraped / 20
                                        </p>
                                    )}
                                    <p className="text-sm text-muted-foreground">{step.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    {isLoading ? (
                        <Button
                            disabled
                            className="h-20 w-full bg-zinc-700 text-white text-lg"
                        >
                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <div className="w-full flex flex-col gap-2">
                            <Button
                                onClick={() => navigate("/scrapy/pagesjaunes/results")}
                                className="h-20 w-full flex gap-5 justify-center items-center bg-zinc-700 text-white text-xl hover:bg-zinc-600"
                            >
                                View Results
                                <LucideArrowRight className="outline rounded-full outline-2 outline-offset-2 outline-white w-4 h-4" />
                            </Button>
                            <div className="flex justify-around items-center">
                                <Button
                                    onClick={() => downloadCardsAsCsv()}
                                    className="h-20 w-[28%] text-base flex gap-2 justify-center items-center"
                                >
                                    {/* <Download /> */}
                                    Download CSV
                                </Button>
                                <Button
                                    onClick={() => downloadCardsAsJson()}
                                    className="h-20 w-[28%] text-base flex gap-2 justify-center items-center"
                                >
                                    {/* <Download /> */}
                                    Download JSON
                                </Button>
                                <Button
                                    onClick={() => downloadCardsAsXml()}
                                    className="h-20 w-[28%] text-base flex gap-2 justify-center items-center"
                                >
                                    {/* <Download /> */}
                                    Download XML
                                </Button>
                            </div>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoadingPage;