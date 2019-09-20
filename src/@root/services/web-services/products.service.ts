import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT, SERVER_API_URL } from '@root/constants';
import { map } from 'rxjs/operators';

import { createRequestOption } from '@root/utils';
import { IProducts } from '@root/models';

type EntityResponseType = HttpResponse<IProducts>;
type EntityArrayResponseType = HttpResponse<IProducts[]>;

@Injectable({ providedIn: 'root' })
export class ProductsService {
    public resourceUrl = SERVER_API_URL + 'api/products';
    public extendUrl = SERVER_API_URL + 'api/products-extend';

    constructor(protected http: HttpClient) {}

    create(products: IProducts): Observable<EntityResponseType> {
        return this.http.post<IProducts>(this.resourceUrl, products, { observe: 'response' });
    }

    update(products: IProducts): Observable<EntityResponseType> {
        return this.http.put<IProducts>(this.resourceUrl, products, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProducts>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProducts[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProducts[]>(this.extendUrl + '/search', { params: options, observe: 'response' });            
    }

    searchAll(keyword: string): Observable<EntityArrayResponseType> {
        let params = new HttpParams();
        params = params.append('keyword', keyword);
        return this.http.get<IProducts[]>(this.extendUrl + '/searchall', { params: params, observe: 'response' });
    }
}
