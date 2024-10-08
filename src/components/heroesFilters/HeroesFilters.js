import { useHttp } from '../../hooks/http.hook';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { fetchFilters } from '../../actions'
import { filtersChanged } from './filtersSlice'
import Spinner from '../spinner/Spinner'
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const { filters, filtersLoadingStatus, activeFilter } = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request))
        // eslint-disable-next-line
    }, [])

    if (filtersLoadingStatus === 'loading') {
        return <Spinner />
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Filters loading error</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Filters not found</h5>
        }
        return arr.map(({ name, className, label }) => {
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });

            return <button
                key={name}
                id={name}
                className={btnClass}
                onClick={() => dispatch(filtersChanged(name))}
            >{label}</button>
        })
    }

    const buttons = renderFilters(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;