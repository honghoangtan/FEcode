import PropTypes from 'prop-types';

import classNames from 'classnames/bind';

import Tippy from '@tippyjs/react/headless';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './SuggestedAccounts.module.scss';

import { Wrapper as PoperWraper } from '~/components/Poper';
import AccountPreview from './AccountPreview/AccountPreview';

const cx = classNames.bind(styles);

function AccountItem() {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PoperWraper>
                    <AccountPreview></AccountPreview>
                </PoperWraper>
            </div>
        );
    };

    return (
        <div>
            <Tippy interactive delay={[800, 0]} offset={[-20, 0]} placement="bottom" render={renderPreview}>
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/836b70f6dba7d2046a62d6e55328dd68.jpeg?x-expires=1695819600&x-signature=rGz4D2H9tjOHVBXkXkVa0xrJFrI%3D"
                        alt="hinh anh"
                    />
                    <div className={cx('item-infor')}>
                        <p className={cx('nickname')}>
                            <strong>ocdangiuuu</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>ốc</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
