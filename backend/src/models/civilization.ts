import { InferSchemaType, model, Schema } from "mongoose";

const civSchema = new Schema({
    name: { type: String, required: true },
    unique_unit: { type: String, required: true },
    unique_tech: { type: String, required: true },
    team_bonus: { type: String, required: true },
    civilization_bonus: { type: String, required: true },
    image: { type: String, required: true },
    unique_buildings: { type: String, required: true },
    expansion: { type: String, required: true },
    army_type: { type: String, required: true },
}, { timestamps: true });

type Civilization = InferSchemaType<typeof civSchema>;

export default model<Civilization>("Civilization", civSchema);