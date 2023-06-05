//import { useState, useEffect } from 'react';
//import { Link, useSearchParams, useLocation } from "react-router-dom";
//import { QueryApi } from '../../API/QueryApi';
//
//export const MoviesList = ({ value }) => {
//    
//    const location = useLocation();
//    const [searchParams, setSearchParams] = useSearchParams();
//    const query = searchParams.get('queryAPI') ?? '';
//    const queryPage = searchParams.get('page') ?? '';
//    //const locationQuery = `${location.search}&page=1`;
//    //setSearchParams({page: 2})
//
//console.log(query);
//    console.log(location)
//    //console.log()
//    const [queryValue, setqueryValue] = useState('');
//    const [data, setData] = useState([]);
//    const [pageQuery, setPageQuery] = useState(1);
//    const [totalPages, setTotalPages] = useState(0);
//    const [pageShow, setPageShow] = useState(1);
//    const [showPaginationNext, setShowPaginationNext] = useState(false);
//    const [showPaginationPrev, setShowPaginationPrev] = useState(false);
//    const [showLoader, setShowLoader] = useState(false); 
//    const [error, setError] = useState('null');
//
//    const handlBtnNext = () => {
//        if (showLoader) return;
//        if (totalPages > pageQuery) {
//            if (pageShow === pageQuery) {
//                setShowLoader(true);
//                setPageQuery((prevState) => prevState + 1);
//            }
//            setPageShow((prevState) => prevState + 1);
//            setShowPaginationPrev(true);
//        }
//        if (totalPages === pageQuery && totalPages > pageShow) {
//            if ( (pageQuery - pageShow) === 1) {
//                setShowPaginationNext(false);
//            }
//            setPageShow((prevState) => prevState + 1);
//            setShowPaginationPrev(true);
//        }  
//    };
//
//    const handlBtnPrev = () => {
//        if (showLoader) return;
//        if (pageShow > 1) {
//            setPageShow((prevState) => prevState - 1);
//            setShowPaginationNext(true)
//        }
//        if (pageShow === 2) {
//             setShowPaginationPrev(false)
//         }   
//    };
////    const addQueryValue = (value) => {
//    if (value !== queryValue) {
////        setSearchParams({
////            query: value,
////            page: 1
////        })
//        setqueryValue(value);
//        setError('null');
//        setData([]);
//        setPageQuery(1);
//        setPageShow(1);
//        setShowPaginationNext(false);
//        setShowPaginationPrev(false);
//        setShowLoader(false)
//    };
//
//    useEffect(() => {
//        if (queryValue === '') return;
//        let queryParams = `search/movie?&include_adult=false&language=en-US&page=${pageQuery}&query=${queryValue}`;
//        QueryApi(queryParams)
//            .then(({ total_pages, results }) => {
//                if (!results.length) return Promise.reject(new Error("Поиск завершен, данных нет!"));
//                setTotalPages(total_pages)
//                setShowPaginationNext(total_pages > pageQuery);
//                setData((prevstate) => [...prevstate, ...results]
//                );
//            })
//            .catch(error => setError(error))
//            .finally(() => setShowLoader(false))
//    }, [queryValue, pageQuery]);
//
//    return (
//        <>
//            {data.length > 0 &&
//                <div>
//            { data.slice((pageShow-1)*20, (pageShow*20)).map(({id, title}) => {
//                return (
//                    <Link key={id} to={`${id}`} className='rt'>
//                        {title}
//                    </Link>
//                )
//            })}
//            { showPaginationPrev &&
//                    <button type='button' onClick={handlBtnPrev}>Prev</button>
//                }
//            { showPaginationNext &&
//                    <button type='button' onClick={handlBtnNext}>Next</button>
//                }
//        </div>}
//        </>
//    )
//}