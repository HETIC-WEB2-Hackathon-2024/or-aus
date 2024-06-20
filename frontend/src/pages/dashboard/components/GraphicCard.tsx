import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function GraphicCard() {
    return (
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Vos candidatures envoyées sur la dernière semaine</CardTitle>
                </div>
            </CardHeader>
        </Card>
    );
}
