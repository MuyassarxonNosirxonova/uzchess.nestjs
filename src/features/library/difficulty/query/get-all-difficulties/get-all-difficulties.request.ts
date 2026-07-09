import {Allow} from "class-validator";
import {GetAllDifficultiesQuery} from "./get-all-difficulties.query";
import { PaginationFilters } from '../../../../common/filters/pagination.filters';

export class GetAllDifficultiesRequest extends PaginationFilters {
  @Allow()
  toQuery = () => new GetAllDifficultiesQuery(this);
}