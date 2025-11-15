if(NOT TARGET op-engineering_op-sqlite::op-sqlite)
add_library(op-engineering_op-sqlite::op-sqlite SHARED IMPORTED)
set_target_properties(op-engineering_op-sqlite::op-sqlite PROPERTIES
    IMPORTED_LOCATION "/Users/okihita/ArcaneSanctum/ARM-AI-Hackathon/GCAVRN/node_modules/@op-engineering/op-sqlite/android/build/intermediates/cxx/Debug/3u1l6658/obj/arm64-v8a/libop-sqlite.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/okihita/ArcaneSanctum/ARM-AI-Hackathon/GCAVRN/node_modules/@op-engineering/op-sqlite/android/build/headers/op-sqlite"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

