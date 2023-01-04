<template>
    <nav
        id="sidebarMenu"
        class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
        <div class="position-sticky pt-3 sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">
                        <!-- <span
                                    data-feather="home"
                                    class="align-text-bottom"
                                ></span> -->
                        <span class="align-text-bottom"
                            ><img src="/icons/home.svg" alt=""
                        /></span>
                        Dashboard
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/order">
                        <!-- <span
                                    data-feather="file"
                                    class="align-text-bottom"
                                ></span> -->
                        <span class="align-text-bottom"
                            ><img src="/icons/file.svg" alt=""
                        /></span>
                        Orders
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/pricing">
                        <!-- <span
                                    data-feather="shopping-cart"
                                    class="align-text-bottom"
                                ></span> -->
                        <span class="align-text-bottom"
                            ><img src="/icons/shopping-cart.svg" alt=""
                        /></span>
                        Pricings
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/gallery">
                        <!-- <span
                                    data-feather="layers"
                                    class="align-text-bottom"
                                ></span> -->
                        <span class="align-text-bottom"
                            ><img src="/icons/image.svg" alt=""
                        /></span>
                        Galleries
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/user">
                        <!-- <span
                                    data-feather="users"
                                    class="align-text-bottom"
                                ></span> -->
                        <span class="align-text-bottom"
                            ><img src="/icons/users.svg" alt=""
                        /></span>
                        Users
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/report">
                        <!-- <span
                                    data-feather="bar-chart-2"
                                    class="align-text-bottom"
                                ></span> -->
                        <span class="align-text-bottom"
                            ><img src="/icons/bar-chart-2.svg" alt=""
                        /></span>
                        Reports
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>